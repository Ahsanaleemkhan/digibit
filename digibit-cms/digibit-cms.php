<?php
/**
 * Plugin Name: Digibit Headless CMS
 * Plugin URI:  https://digibit.co
 * Description: Headless CMS for the Digibit Next.js website. Exposes all page content via WPGraphQL so every section is editable from WordPress.
 * Version:     1.0.0
 * Author:      Digibit Studio
 * Author URI:  https://digibit.co
 * Text Domain: digibit-cms
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DIGIBIT_CMS_VERSION', '1.0.0' );
define( 'DIGIBIT_CMS_DIR', plugin_dir_path( __FILE__ ) );
define( 'DIGIBIT_CMS_URL', plugin_dir_url( __FILE__ ) );

/* ─── Dependency check: WPGraphQL ───────────────────────────────────────────── */
add_action( 'admin_init', function () {
	if ( ! class_exists( 'WPGraphQL' ) ) {
		add_action( 'admin_notices', function () {
			echo '<div class="notice notice-error"><p><strong>Digibit CMS</strong> requires the <a href="https://www.wpgraphql.com/" target="_blank">WPGraphQL</a> plugin to be installed and active.</p></div>';
		} );
	}
} );

/* ─── Load modules ──────────────────────────────────────────────────────────── */
require_once DIGIBIT_CMS_DIR . 'includes/options-pages.php';
require_once DIGIBIT_CMS_DIR . 'includes/cpt-case-studies.php';
require_once DIGIBIT_CMS_DIR . 'includes/cpt-services.php';
require_once DIGIBIT_CMS_DIR . 'includes/graphql-schema.php';
require_once DIGIBIT_CMS_DIR . 'includes/revalidation.php';
require_once DIGIBIT_CMS_DIR . 'includes/seed-data.php';

/* ─── Activation: seed data + init defaults ────────────────────────────────── */
register_activation_hook( __FILE__, function () {
	digibit_seed_all();
	
	// Initialize revalidation defaults
	if ( ! get_option( 'digibit_reval_url' ) ) {
		$site_url = home_url();
		$next_url = str_replace( 'backend.', '', $site_url ) . '/api/revalidate';
		update_option( 'digibit_reval_url', $next_url );
	}
	if ( ! get_option( 'digibit_reval_secret' ) ) {
		update_option( 'digibit_reval_secret', 'digibit-reval-2026' );
	}
} );

/* ─── Handle manual re-seed ─────────────────────────────────────────────────── */
add_action( 'admin_init', function () {
	if ( isset( $_POST['digibit_reseed'] ) && wp_verify_nonce( $_POST['digibit_reseed_nonce'], 'digibit_reseed' ) && current_user_can( 'manage_options' ) ) {
		digibit_seed_all();
		add_action( 'admin_notices', function () {
			echo '<div class="notice notice-success is-dismissible"><p>✓ All default data has been seeded successfully!</p></div>';
		} );
	}
} );

/* ─── Admin menu ────────────────────────────────────────────────────────────── */
add_action( 'admin_menu', function () {
	add_menu_page(
		'Digibit CMS',
		'Digibit CMS',
		'manage_options',
		'digibit-cms',
		'digibit_cms_dashboard_page',
		'dashicons-layout',
		3
	);
} );

function digibit_cms_dashboard_page() {
	$seeded = get_option( 'digibit_seeded', false );
	?>
	<div class="wrap">
		<h1 style="display:flex;align-items:center;gap:10px">
			<span style="background:#1a1f5c;color:#fff;width:40px;height:40px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-size:18px">◆</span>
			Digibit Headless CMS
		</h1>

		<?php if ( ! $seeded ) : ?>
		<div class="notice notice-warning" style="margin:20px 0;padding:16px">
			<p><strong>⚠ Default data not loaded yet.</strong> Click the button below to populate all pages with default content.</p>
		</div>
		<?php endif; ?>

		<div style="background:#fff;border:1px solid #c3c4c7;border-radius:8px;padding:24px;margin:20px 0">
			<h2 style="margin-top:0">📄 Pages</h2>
			<p style="color:#646970">Click any page to edit its content section by section.</p>
			<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-top:16px">
				<?php
				$pages = [
					'Homepage'       => ['digibit-homepage', '🏠'],
					'About'          => ['digibit-about', '👋'],
					'Contact'        => ['digibit-contact', '📬'],
					'Pricing'        => ['digibit-pricing', '💰'],
					'Careers'        => ['digibit-careers', '🧑‍💼'],
					'Insights'       => ['digibit-insights', '📝'],
					'Work'           => ['digibit-work', '🎯'],
					'Services'       => ['digibit-services-index', '⚡'],
					'Navigation'     => ['digibit-navigation', '🧭'],
					'Footer'         => ['digibit-footer', '📋'],
				];
				foreach ( $pages as $label => $info ) :
				?>
				<a href="<?php echo admin_url( 'admin.php?page=' . $info[0] ); ?>" style="display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid #c3c4c7;border-radius:8px;text-decoration:none;color:#1d2327;font-weight:500;transition:all .2s;background:#fafafa">
					<span style="font-size:20px"><?php echo $info[1]; ?></span>
					<?php echo esc_html( $label ); ?>
				</a>
				<?php endforeach; ?>
			</div>
		</div>

		<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
			<div style="background:#fff;border:1px solid #c3c4c7;border-radius:8px;padding:24px">
				<h2 style="margin-top:0">📦 Content Types</h2>
				<ul style="margin:0">
					<li><a href="<?php echo admin_url('edit.php?post_type=digibit_case_study'); ?>">Case Studies</a></li>
					<li><a href="<?php echo admin_url('edit.php?post_type=digibit_service'); ?>">Service Pages</a></li>
				</ul>
			</div>
			<div style="background:#fff;border:1px solid #c3c4c7;border-radius:8px;padding:24px">
				<h2 style="margin-top:0">🔧 Tools</h2>
				<form method="post" style="margin-top:12px">
					<?php wp_nonce_field( 'digibit_reseed', 'digibit_reseed_nonce' ); ?>
					<p style="color:#646970;margin:0 0 12px">Load or reset all pages with default content from the plugin.</p>
					<button type="submit" name="digibit_reseed" value="1" class="button button-secondary" onclick="return confirm('This will overwrite all page content with defaults. Continue?')">
						🔄 Seed Default Data
					</button>
				</form>
			</div>
		</div>

		<div style="background:#fff;border:1px solid #c3c4c7;border-radius:8px;padding:24px;margin-top:20px">
			<h2 style="margin-top:0">⚙️ Revalidation</h2>
			<p style="color:#646970">Configure instant cache clearing in Next.js when you update content.</p>
			<a href="<?php echo admin_url('admin.php?page=digibit-revalidation'); ?>" class="button button-secondary">Configure Revalidation →</a>
		</div>
	</div>
	<?php
}
