<?php
/**
 * Digibit CMS — Options Pages with Accordion Sections
 */
if ( ! defined( 'ABSPATH' ) ) exit;

/* ─── Accordion renderer ─────────────────────────────────────────────────── */
function digibit_render_page( $slug, $title, $schema ) {
	$data = get_option( $slug, '{}' );
	$json = json_decode( $data, true );
	if ( ! is_array( $json ) ) $json = [];

	if ( isset( $_POST[ $slug . '_nonce' ] ) && wp_verify_nonce( $_POST[ $slug . '_nonce' ], $slug . '_save' ) ) {
		$posted = [];
		foreach ( $schema as $section ) {
			foreach ( $section['fields'] as $field ) {
				$key = $field['key'];
				$val = isset( $_POST[ $key ] ) ? wp_unslash( $_POST[ $key ] ) : '';
				if ( $field['type'] === 'json' ) {
					$decoded = json_decode( $val, true );
					$posted[ $key ] = ( $decoded !== null ) ? $decoded : $val;
				} else {
					$posted[ $key ] = sanitize_textarea_field( $val );
				}
			}
		}
		update_option( $slug, wp_json_encode( $posted, JSON_UNESCAPED_UNICODE ) );
		$json = $posted;
		echo '<div class="notice notice-success is-dismissible"><p>✓ Saved successfully!</p></div>';
	}

	?>
	<div class="wrap">
		<h1 style="display:flex;align-items:center;gap:10px">
			<span style="background:#1a1f5c;color:#fff;width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:16px">◆</span>
			<?php echo esc_html( $title ); ?>
		</h1>
		<p style="color:#646970;margin-bottom:24px">Click any section below to expand and edit its content.</p>
		<form method="post">
			<input type="hidden" name="<?php echo $slug; ?>_nonce" value="<?php echo wp_create_nonce( $slug . '_save' ); ?>">
			<?php foreach ( $schema as $si => $section ) : ?>
			<div class="dg-section" style="background:#fff;border:1px solid #c3c4c7;border-radius:8px;margin-bottom:12px;overflow:hidden">
				<div class="dg-section-head" onclick="this.parentElement.classList.toggle('dg-open')" style="padding:16px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;user-select:none;border-bottom:1px solid transparent;transition:all .2s">
					<div style="display:flex;align-items:center;gap:12px">
						<span style="background:#f0f0f1;width:28px;height:28px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;color:#1a1f5c;font-weight:600"><?php echo str_pad($si+1, 2, '0', STR_PAD_LEFT); ?></span>
						<strong style="font-size:14px"><?php echo esc_html( $section['title'] ); ?></strong>
						<span style="color:#a0a5aa;font-size:12px;margin-left:4px"><?php echo count($section['fields']); ?> field<?php echo count($section['fields'])>1?'s':''; ?></span>
					</div>
					<span class="dg-arrow" style="transition:transform .2s;font-size:18px;color:#a0a5aa">▸</span>
				</div>
				<div class="dg-section-body" style="display:none;padding:20px;border-top:1px solid #f0f0f1;background:#fafafa">
					<?php foreach ( $section['fields'] as $field ) :
						$key = $field['key'];
						$val = isset( $json[ $key ] ) ? $json[ $key ] : ( $field['default'] ?? '' );
					?>
					<div style="margin-bottom:18px">
						<label style="display:block;font-weight:600;margin-bottom:6px;font-size:13px;color:#1d2327"><?php echo esc_html( $field['label'] ); ?></label>
						<?php if ( $field['type'] === 'textarea' ) : ?>
							<textarea name="<?php echo esc_attr($key); ?>" rows="3" style="width:100%;max-width:640px;border-radius:6px;border:1px solid #c3c4c7;padding:10px 12px;font-size:14px"><?php echo esc_textarea($val); ?></textarea>
						<?php elseif ( $field['type'] === 'json' ) :
							$jv = is_array($val) ? wp_json_encode($val, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE) : (is_string($val) ? $val : ''); ?>
							<textarea name="<?php echo esc_attr($key); ?>" rows="10" style="width:100%;max-width:640px;font-family:monospace;font-size:12px;border-radius:6px;border:1px solid #c3c4c7;padding:10px 12px;background:#f6f7f7;line-height:1.6"><?php echo esc_textarea($jv); ?></textarea>
							<p class="description" style="margin-top:4px;color:#a0a5aa">Edit as JSON array or object</p>
						<?php else : ?>
							<input type="text" name="<?php echo esc_attr($key); ?>" value="<?php echo esc_attr($val); ?>" style="width:100%;max-width:640px;border-radius:6px;border:1px solid #c3c4c7;padding:8px 12px;font-size:14px">
						<?php endif; ?>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
			<?php endforeach; ?>
			<p style="margin-top:20px"><button type="submit" class="button button-primary button-large" style="padding:4px 32px">Save Changes</button></p>
		</form>
	</div>
	<style>
		.dg-open .dg-section-body { display:block !important; }
		.dg-open .dg-section-head { border-bottom-color:#f0f0f1; background:#fefefe; }
		.dg-open .dg-arrow { transform:rotate(90deg); }
		.dg-section:hover .dg-section-head { background:#fefefe; }
	</style>
	<?php
}

/* ─── Collect pages and register all at once ──────────────────────────── */
global $digibit_pages;
$digibit_pages = [];

function digibit_add_page( $slug, $menu_title, $callback ) {
	global $digibit_pages;
	$digibit_pages[] = [ 'slug' => $slug, 'title' => $menu_title, 'cb' => $callback ];
}

add_action( 'admin_menu', function () {
	global $digibit_pages;
	foreach ( $digibit_pages as $p ) {
		add_submenu_page( 'digibit-cms', $p['title'], $p['title'], 'manage_options', $p['slug'], $p['cb'] );
	}
}, 20 );

/* ═══ HOMEPAGE ═══════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-homepage', 'Homepage', function () {
	digibit_render_page( 'digibit-homepage', 'Homepage', [
		[ 'title' => 'Hero Section', 'fields' => [
			[ 'key'=>'hero_eyebrow','label'=>'Eyebrow text','type'=>'text' ],
			[ 'key'=>'hero_tagline','label'=>'Tagline','type'=>'textarea' ],
			[ 'key'=>'hero_cta1','label'=>'CTA Button 1 text','type'=>'text' ],
			[ 'key'=>'hero_cta2','label'=>'CTA Button 2 text','type'=>'text' ],
			[ 'key'=>'hero_subleft','label'=>'Sub-left text','type'=>'text' ],
		]],
		[ 'title' => 'Clients Marquee', 'fields' => [
			[ 'key'=>'clients_label','label'=>'Label','type'=>'text' ],
			[ 'key'=>'clients_names','label'=>'Client names','type'=>'json' ],
		]],
		[ 'title' => 'Stats Strip', 'fields' => [
			[ 'key'=>'stats','label'=>'Stats [{count, suffix, label}]','type'=>'json' ],
		]],
		[ 'title' => 'Selected Work Cards', 'fields' => [
			[ 'key'=>'work_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'work_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'work_cta','label'=>'CTA text','type'=>'text' ],
			[ 'key'=>'work_cards','label'=>'Cards [{href, img, cat, title}]','type'=>'json' ],
		]],
		[ 'title' => 'Service Wheel', 'fields' => [
			[ 'key'=>'wheel_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'wheel_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'wheel_desc','label'=>'Description','type'=>'textarea' ],
			[ 'key'=>'wheel_cta','label'=>'CTA label','type'=>'text' ],
		]],
		[ 'title' => 'Services Accordion', 'fields' => [
			[ 'key'=>'svc_acc_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'svc_acc_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'svc_acc_items','label'=>'Items [{idx, title, desc}]','type'=>'json' ],
		]],
		[ 'title' => 'Process Section', 'fields' => [
			[ 'key'=>'process_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'process_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'process_steps','label'=>'Steps [{num, title, desc}]','type'=>'json' ],
		]],
		[ 'title' => 'Results Ticker', 'fields' => [
			[ 'key'=>'ticker_label','label'=>'Label','type'=>'text' ],
			[ 'key'=>'ticker_items','label'=>'Items (JSON array of strings)','type'=>'json' ],
		]],
		[ 'title' => 'Compare Toggle (Why 360°)', 'fields' => [
			[ 'key'=>'compare_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'compare_heading','label'=>'Heading','type'=>'textarea' ],
			[ 'key'=>'compare_data','label'=>'Data {startup:{them,us},enterprise:{them,us}}','type'=>'json' ],
		]],
		[ 'title' => 'FAQ Section', 'fields' => [
			[ 'key'=>'faq_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'faq_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'faq_items','label'=>'FAQs [{q, a}]','type'=>'json' ],
		]],
		[ 'title' => 'Testimonial', 'fields' => [
			[ 'key'=>'testimonial_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'testimonial_quote','label'=>'Quote','type'=>'textarea' ],
			[ 'key'=>'testimonial_author','label'=>'Author','type'=>'text' ],
			[ 'key'=>'testimonial_role','label'=>'Role','type'=>'text' ],
		]],
		[ 'title' => 'Final CTA', 'fields' => [
			[ 'key'=>'cta_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'cta_heading','label'=>'Heading','type'=>'textarea' ],
			[ 'key'=>'cta_btn1','label'=>'Button 1','type'=>'text' ],
			[ 'key'=>'cta_btn2','label'=>'Button 2','type'=>'text' ],
		]],
	]);
});

/* ═══ ABOUT ══════════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-about', 'About', function () {
	digibit_render_page( 'digibit-about', 'About Page', [
		[ 'title' => 'Hero', 'fields' => [
			[ 'key'=>'hero_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'hero_heading','label'=>'Heading (H1)','type'=>'textarea' ],
		]],
		[ 'title' => 'Our Reason', 'fields' => [
			[ 'key'=>'reason_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'reason_paragraphs','label'=>'Paragraphs (JSON array of strings)','type'=>'json' ],
		]],
		[ 'title' => 'Beliefs ("How we show up")', 'fields' => [
			[ 'key'=>'beliefs_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'beliefs_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'beliefs_cards','label'=>'Cards [{tag, title, desc}]','type'=>'json' ],
		]],
		[ 'title' => 'Timeline ("A short history")', 'fields' => [
			[ 'key'=>'timeline_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'timeline_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'timeline_entries','label'=>'Entries [{year, title, desc}]','type'=>'json' ],
		]],
		[ 'title' => 'Final CTA', 'fields' => [
			[ 'key'=>'cta_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'cta_button','label'=>'Button text','type'=>'text' ],
		]],
	]);
});

/* ═══ CONTACT ════════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-contact', 'Contact', function () {
	digibit_render_page( 'digibit-contact', 'Contact Page', [
		[ 'title' => 'Hero', 'fields' => [
			[ 'key'=>'hero_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'hero_heading','label'=>'Heading','type'=>'textarea' ],
		]],
		[ 'title' => 'Sidebar Info', 'fields' => [
			[ 'key'=>'email','label'=>'Email','type'=>'text' ],
			[ 'key'=>'phone','label'=>'Phone','type'=>'text' ],
			[ 'key'=>'offices','label'=>'Offices [{label, address}]','type'=>'json' ],
		]],
		[ 'title' => 'Form Services', 'fields' => [
			[ 'key'=>'form_services','label'=>'Service options (JSON array of strings)','type'=>'json' ],
		]],
	]);
});

/* ═══ PRICING ════════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-pricing', 'Pricing', function () {
	digibit_render_page( 'digibit-pricing', 'Pricing Page', [
		[ 'title' => 'Hero', 'fields' => [
			[ 'key'=>'hero_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'hero_heading','label'=>'Heading','type'=>'textarea' ],
			[ 'key'=>'hero_desc','label'=>'Description','type'=>'textarea' ],
		]],
		[ 'title' => 'Plans', 'fields' => [
			[ 'key'=>'plans','label'=>'Plans [{tag, title, sub, price, priceNote, note, items[], cta, featured}]','type'=>'json' ],
		]],
		[ 'title' => 'Add-ons', 'fields' => [
			[ 'key'=>'addons_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'addons_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'addons','label'=>'Add-ons [{title, price, desc}]','type'=>'json' ],
		]],
		[ 'title' => 'Final CTA', 'fields' => [
			[ 'key'=>'cta_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'cta_button','label'=>'Button text','type'=>'text' ],
		]],
	]);
});

/* ═══ CAREERS ════════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-careers', 'Careers', function () {
	digibit_render_page( 'digibit-careers', 'Careers Page', [
		[ 'title' => 'Hero', 'fields' => [
			[ 'key'=>'hero_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'hero_heading','label'=>'Heading','type'=>'textarea' ],
			[ 'key'=>'hero_desc','label'=>'Description','type'=>'textarea' ],
		]],
		[ 'title' => 'Why Digibit', 'fields' => [
			[ 'key'=>'why_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'why_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'perks','label'=>'Perks [{n, title, desc}]','type'=>'json' ],
		]],
		[ 'title' => 'Open Roles', 'fields' => [
			[ 'key'=>'roles_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'roles_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'roles','label'=>'Roles [{title, dept, loc}]','type'=>'json' ],
			[ 'key'=>'roles_fallback','label'=>'Fallback email','type'=>'text' ],
		]],
		[ 'title' => 'Life at Digibit', 'fields' => [
			[ 'key'=>'life_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'life_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'life_cards','label'=>'Cards [{bg, label}]','type'=>'json' ],
		]],
		[ 'title' => 'Final CTA', 'fields' => [
			[ 'key'=>'cta_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'cta_button','label'=>'Button text','type'=>'text' ],
		]],
	]);
});

/* ═══ INSIGHTS ═══════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-insights', 'Insights', function () {
	digibit_render_page( 'digibit-insights', 'Insights Page', [
		[ 'title' => 'Hero', 'fields' => [
			[ 'key'=>'hero_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'hero_heading','label'=>'Heading','type'=>'textarea' ],
			[ 'key'=>'hero_desc','label'=>'Description','type'=>'textarea' ],
		]],
		[ 'title' => 'Category Filters', 'fields' => [
			[ 'key'=>'categories','label'=>'Categories (JSON array of strings)','type'=>'json' ],
		]],
		[ 'title' => 'Featured Post', 'fields' => [
			[ 'key'=>'featured_tag','label'=>'Tag line','type'=>'text' ],
			[ 'key'=>'featured_title','label'=>'Title','type'=>'text' ],
			[ 'key'=>'featured_desc','label'=>'Description','type'=>'textarea' ],
			[ 'key'=>'featured_author','label'=>'Author line','type'=>'text' ],
			[ 'key'=>'featured_grad','label'=>'Gradient CSS','type'=>'text' ],
		]],
		[ 'title' => 'Posts Grid', 'fields' => [
			[ 'key'=>'posts','label'=>'Posts [{grad, tag, title, desc, by}]','type'=>'json' ],
		]],
		[ 'title' => 'Newsletter', 'fields' => [
			[ 'key'=>'newsletter_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'newsletter_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'newsletter_desc','label'=>'Description','type'=>'textarea' ],
		]],
	]);
});

/* ═══ WORK ═══════════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-work', 'Work', function () {
	digibit_render_page( 'digibit-work', 'Work / Portfolio Page', [
		[ 'title' => 'Hero', 'fields' => [
			[ 'key'=>'hero_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'hero_heading','label'=>'Heading','type'=>'textarea' ],
			[ 'key'=>'hero_desc','label'=>'Description','type'=>'textarea' ],
		]],
		[ 'title' => 'Filter Tags', 'fields' => [
			[ 'key'=>'filters','label'=>'Filter labels (JSON array)','type'=>'json' ],
		]],
		[ 'title' => 'Project Cards', 'fields' => [
			[ 'key'=>'works','label'=>'Works [{href, img, cat, title, stat, year, big}]','type'=>'json' ],
		]],
		[ 'title' => 'Final CTA', 'fields' => [
			[ 'key'=>'cta_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'cta_button','label'=>'Button text','type'=>'text' ],
		]],
	]);
});

/* ═══ SERVICES INDEX ═════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-services-index', 'Services Index', function () {
	digibit_render_page( 'digibit-services-index', 'Services Index Page', [
		[ 'title' => 'Hero', 'fields' => [
			[ 'key'=>'hero_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'hero_heading','label'=>'Heading','type'=>'textarea' ],
			[ 'key'=>'hero_desc','label'=>'Description','type'=>'textarea' ],
		]],
		[ 'title' => 'Bento Grid Items', 'fields' => [
			[ 'key'=>'bento_items','label'=>'Items [{href, icon, title, desc, tags[], feature, cyan, span3, tall}]','type'=>'json' ],
		]],
		[ 'title' => 'Three Ways to Work', 'fields' => [
			[ 'key'=>'ways_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'ways_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'ways_items','label'=>'Items [{idx, title, desc}]','type'=>'json' ],
		]],
		[ 'title' => 'Final CTA', 'fields' => [
			[ 'key'=>'cta_eyebrow','label'=>'Eyebrow','type'=>'text' ],
			[ 'key'=>'cta_heading','label'=>'Heading','type'=>'text' ],
			[ 'key'=>'cta_button','label'=>'Button text','type'=>'text' ],
		]],
	]);
});

/* ═══ NAVIGATION ═════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-navigation', 'Navigation', function () {
	digibit_render_page( 'digibit-navigation', 'Site Navigation', [
		[ 'title' => 'Nav Links', 'fields' => [
			[ 'key'=>'links','label'=>'Links [{href, label}]','type'=>'json' ],
			[ 'key'=>'cta_label','label'=>'CTA button label','type'=>'text' ],
		]],
	]);
});

/* ═══ FOOTER ═════════════════════════════════════════════════════════════ */
digibit_add_page( 'digibit-footer', 'Footer', function () {
	digibit_render_page( 'digibit-footer', 'Site Footer', [
		[ 'title' => 'Brand', 'fields' => [
			[ 'key'=>'tagline','label'=>'Tagline','type'=>'textarea' ],
			[ 'key'=>'copyright','label'=>'Copyright','type'=>'text' ],
		]],
		[ 'title' => 'Contact Info', 'fields' => [
			[ 'key'=>'email','label'=>'Email','type'=>'text' ],
			[ 'key'=>'phone','label'=>'Phone','type'=>'text' ],
		]],
		[ 'title' => 'Column Links', 'fields' => [
			[ 'key'=>'company_links','label'=>'Company links [{label, href}]','type'=>'json' ],
			[ 'key'=>'service_links','label'=>'Services links [{label, href}]','type'=>'json' ],
		]],
		[ 'title' => 'Bottom Bar', 'fields' => [
			[ 'key'=>'bottom_left','label'=>'Bottom left text','type'=>'text' ],
			[ 'key'=>'bottom_right','label'=>'Bottom right text','type'=>'text' ],
		]],
	]);
});
