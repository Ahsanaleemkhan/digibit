<?php
/**
 * Digibit CMS — CPT: Case Studies
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function () {
	register_post_type( 'digibit_case_study', [
		'labels' => [
			'name'          => 'Case Studies',
			'singular_name' => 'Case Study',
			'add_new_item'  => 'Add New Case Study',
			'edit_item'     => 'Edit Case Study',
		],
		'public'       => false,
		'show_ui'      => true,
		'show_in_menu' => 'digibit-cms',
		'supports'     => [ 'title' ],
		'show_in_graphql'      => true,
		'graphql_single_name'  => 'digibitCaseStudy',
		'graphql_plural_name'  => 'digibitCaseStudies',
	] );
} );

/* ─── Meta box ──────────────────────────────────────────────────────────── */
add_action( 'add_meta_boxes', function () {
	add_meta_box( 'digibit_case_data', 'Case Study Data (JSON)', 'digibit_case_meta_box', 'digibit_case_study', 'normal', 'high' );
} );

function digibit_case_meta_box( $post ) {
	wp_nonce_field( 'digibit_case_save', 'digibit_case_nonce' );
	$val = get_post_meta( $post->ID, '_digibit_case_data', true );
	if ( empty( $val ) ) {
		$val = wp_json_encode( [
			'slug'      => '',
			'meta'      => [ 'client' => '', 'industry' => '', 'engagement' => '', 'timeline' => '', 'year' => '' ],
			'h1'        => '',
			'lede'      => '',
			'visualBg'  => '',
			'visualWord'=> '',
			'stats'     => [],
			'sections'  => [],
			'nav'       => [ 'prev' => null, 'next' => null ],
		], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	}
	echo '<p>Edit the full case study data as JSON. Refer to the CasePage component props for the expected shape.</p>';
	echo '<textarea name="digibit_case_data" rows="30" style="width:100%;font-family:monospace;font-size:12px">' . esc_textarea( $val ) . '</textarea>';
}

add_action( 'save_post_digibit_case_study', function ( $post_id ) {
	if ( ! isset( $_POST['digibit_case_nonce'] ) || ! wp_verify_nonce( $_POST['digibit_case_nonce'], 'digibit_case_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( isset( $_POST['digibit_case_data'] ) ) {
		update_post_meta( $post_id, '_digibit_case_data', wp_unslash( $_POST['digibit_case_data'] ) );
	}
} );

/* ─── Register meta for GraphQL ─────────────────────────────────────────── */
add_action( 'init', function () {
	register_post_meta( 'digibit_case_study', '_digibit_case_data', [
		'show_in_rest' => true,
		'single'       => true,
		'type'         => 'string',
	] );
} );
