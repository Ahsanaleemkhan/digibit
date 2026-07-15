<?php
/**
 * Digibit CMS — Seed Data
 * Pre-populates all options with current hardcoded values.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

function digibit_seed_all() {
	$data = json_decode( file_get_contents( __DIR__ . '/defaults.json' ), true );
	if ( ! $data ) return;

	$map = [
		'homepage'       => 'digibit-homepage',
		'about'          => 'digibit-about',
		'contact'        => 'digibit-contact',
		'pricing'        => 'digibit-pricing',
		'careers'        => 'digibit-careers',
		'insights'       => 'digibit-insights',
		'work'           => 'digibit-work',
		'services_index' => 'digibit-services-index',
		'navigation'     => 'digibit-navigation',
		'footer'         => 'digibit-footer',
	];

	foreach ( $map as $key => $option ) {
		if ( isset( $data[ $key ] ) ) {
			update_option( $option, wp_json_encode( $data[ $key ], JSON_UNESCAPED_UNICODE ) );
		}
	}

	update_option( 'digibit_seeded', true );
}
