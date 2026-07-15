<?php
/**
 * Digibit CMS — Revalidation Webhook
 * Fires a revalidation request to the Next.js frontend whenever content is saved.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

/* Initialize defaults on plugin load */
add_action( 'plugins_loaded', function () {
	if ( ! get_option( 'digibit_reval_url' ) ) {
		$site_url = home_url();
		$next_url = str_replace( 'backend.', '', $site_url ) . '/api/revalidate';
		update_option( 'digibit_reval_url', $next_url );
	}
	if ( ! get_option( 'digibit_reval_secret' ) ) {
		update_option( 'digibit_reval_secret', 'digibit-reval-2026' );
	}
} );

/* Settings page for revalidation config */
add_action( 'admin_menu', function () {
	add_submenu_page( 
		'digibit-cms', 
		'Revalidation Settings', 
		'Revalidation', 
		'manage_options', 
		'digibit-revalidation', 
		'digibit_render_revalidation_page' 
	);
}, 30 );

function digibit_render_revalidation_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( 'Unauthorized' );
	}

	if ( isset( $_POST['digibit_reval_nonce'] ) && wp_verify_nonce( $_POST['digibit_reval_nonce'], 'digibit_reval_save' ) ) {
		update_option( 'digibit_reval_url', sanitize_url( $_POST['reval_url'] ?? '' ) );
		update_option( 'digibit_reval_secret', sanitize_text_field( $_POST['reval_secret'] ?? '' ) );
		echo '<div class="notice notice-success is-dismissible"><p><strong>✓ Saved!</strong> Revalidation is now active.</p></div>';
	}

	$url    = get_option( 'digibit_reval_url', '' );
	$secret = get_option( 'digibit_reval_secret', '' );
	?>
	<div class="wrap">
		<h1 style="display:flex;align-items:center;gap:10px">
			<span style="background:#1a1f5c;color:#fff;width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:16px">⚙</span>
			Revalidation Settings
		</h1>
		<p style="color:#646970;margin-bottom:24px">Configure how WordPress communicates with your Next.js frontend when content changes.</p>
		
		<form method="post" style="max-width:640px">
			<input type="hidden" name="digibit_reval_nonce" value="<?php echo wp_create_nonce( 'digibit_reval_save' ); ?>">
			
			<div style="background:#fff;border:1px solid #c3c4c7;border-radius:8px;padding:20px;margin-bottom:20px">
				<div style="margin-bottom:18px">
					<label style="display:block;font-weight:600;margin-bottom:6px;font-size:13px;color:#1d2327">
						Next.js Revalidation URL
					</label>
					<input type="url" name="reval_url" value="<?php echo esc_attr( $url ); ?>" class="regular-text" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid #c3c4c7;font-size:14px" placeholder="https://your-domain.com/api/revalidate" required>
					<p style="margin-top:6px;color:#a0a5aa;font-size:12px">The webhook URL on your Next.js site (e.g., https://dgbit.co/api/revalidate)</p>
				</div>

				<div>
					<label style="display:block;font-weight:600;margin-bottom:6px;font-size:13px;color:#1d2327">
						Secret Key
					</label>
					<input type="text" name="reval_secret" value="<?php echo esc_attr( $secret ); ?>" class="regular-text" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid #c3c4c7;font-size:14px;font-family:monospace" placeholder="your-secret-key" required>
					<p style="margin-top:6px;color:#a0a5aa;font-size:12px">Must match REVALIDATION_SECRET in your Next.js .env</p>
				</div>
			</div>

			<p class="submit">
				<button type="submit" class="button button-primary button-large">Save Settings</button>
			</p>
		</form>

		<div style="background:#f0f7ff;border-left:4px solid #0073aa;padding:15px;margin-top:30px;border-radius:4px">
			<p style="margin:0;color:#0073aa"><strong>ℹ Test Webhook</strong></p>
			<p style="margin:8px 0 0 0;color:#666;font-size:13px">After saving, edit any page and click "Save Changes". Your live site will revalidate automatically.</p>
		</div>
	</div>
	<?php
}

/* Fire webhook on option update or CPT save */
function digibit_trigger_revalidation( $paths = [ '/' ] ) {
	$url    = get_option( 'digibit_reval_url', '' );
	$secret = get_option( 'digibit_reval_secret', '' );
	if ( empty( $url ) ) return;

	wp_remote_post( $url, [
		'timeout' => 5,
		'body'    => wp_json_encode( [ 'secret' => $secret, 'paths' => $paths ] ),
		'headers' => [ 'Content-Type' => 'application/json' ],
	] );
}

/* On options page save */
add_action( 'updated_option', function ( $option ) {
	$map = [
		'digibit-homepage'       => [ '/' ],
		'digibit-about'          => [ '/about' ],
		'digibit-contact'        => [ '/contact' ],
		'digibit-pricing'        => [ '/pricing' ],
		'digibit-careers'        => [ '/careers' ],
		'digibit-insights'       => [ '/insights' ],
		'digibit-work'           => [ '/work' ],
		'digibit-services-index' => [ '/services' ],
		'digibit-navigation'     => [ '/' ],
		'digibit-footer'         => [ '/' ],
	];
	if ( isset( $map[ $option ] ) ) {
		digibit_trigger_revalidation( $map[ $option ] );
	}
} );

/* On CPT save */
add_action( 'save_post_digibit_case_study', function ( $post_id ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	$data = get_post_meta( $post_id, '_digibit_case_data', true );
	$json = json_decode( $data, true );
	$slug = $json['slug'] ?? '';
	$paths = [ '/work' ];
	if ( $slug ) $paths[] = '/work/' . $slug;
	digibit_trigger_revalidation( $paths );
}, 20 );

add_action( 'save_post_digibit_service', function ( $post_id ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	$data = get_post_meta( $post_id, '_digibit_svc_data', true );
	$json = json_decode( $data, true );
	$slug = $json['slug'] ?? '';
	$paths = [ '/services' ];
	if ( $slug ) $paths[] = '/services/' . $slug;
	digibit_trigger_revalidation( $paths );
}, 20 );
