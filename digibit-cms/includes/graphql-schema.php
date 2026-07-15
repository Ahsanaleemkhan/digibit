<?php
/**
 * Digibit CMS — GraphQL Schema Extensions
 * Registers custom queries on the WPGraphQL schema for each options page.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'graphql_register_types', function () {

	/* ─── Helper: register a root query that returns a JSON options blob ── */
	$pages = [
		'digibitHomepage'      => 'digibit-homepage',
		'digibitAbout'         => 'digibit-about',
		'digibitContact'       => 'digibit-contact',
		'digibitPricing'       => 'digibit-pricing',
		'digibitCareers'       => 'digibit-careers',
		'digibitInsights'      => 'digibit-insights',
		'digibitWork'          => 'digibit-work',
		'digibitServicesIndex' => 'digibit-services-index',
		'digibitNavigation'    => 'digibit-navigation',
		'digibitFooter'        => 'digibit-footer',
	];

	foreach ( $pages as $field_name => $option_key ) {
		register_graphql_field( 'RootQuery', $field_name, [
			'type'        => 'String',
			'description' => "JSON blob for {$field_name} options",
			'resolve'     => function () use ( $option_key ) {
				$val = get_option( $option_key, '{}' );
				return is_string( $val ) ? $val : wp_json_encode( $val );
			},
		] );
	}

	/* ─── Case Study: expose _digibit_case_data meta via GraphQL ────────── */
	register_graphql_field( 'DigibitCaseStudy', 'caseData', [
		'type'        => 'String',
		'description' => 'Full case study JSON data',
		'resolve'     => function ( $post ) {
			return get_post_meta( $post->databaseId, '_digibit_case_data', true ) ?: '{}';
		},
	] );

	/* ─── Service: expose _digibit_svc_data meta via GraphQL ────────────── */
	register_graphql_field( 'DigibitService', 'serviceData', [
		'type'        => 'String',
		'description' => 'Full service page JSON data',
		'resolve'     => function ( $post ) {
			return get_post_meta( $post->databaseId, '_digibit_svc_data', true ) ?: '{}';
		},
	] );
} );
