<?php
/**
 * Digibit CMS — CPT: Services
 */
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function () {
	register_post_type( 'digibit_service', [
		'labels' => [
			'name'          => 'Service Pages',
			'singular_name' => 'Service Page',
			'add_new_item'  => 'Add New Service',
			'edit_item'     => 'Edit Service',
		],
		'public'       => false,
		'show_ui'      => true,
		'show_in_menu' => 'digibit-cms',
		'supports'     => [ 'title' ],
		'show_in_graphql'      => true,
		'graphql_single_name'  => 'digibitService',
		'graphql_plural_name'  => 'digibitServices',
	] );
} );

add_action( 'add_meta_boxes', function () {
	add_meta_box( 'digibit_svc_data', 'Service Page Data (JSON)', 'digibit_svc_meta_box', 'digibit_service', 'normal', 'high' );
} );

function digibit_svc_meta_box( $post ) {
	wp_nonce_field( 'digibit_svc_save', 'digibit_svc_nonce' );
	$val = get_post_meta( $post->ID, '_digibit_svc_data', true );
	if ( empty( $val ) ) {
		$val = wp_json_encode( [
			'slug'         => '',
			'crumb'        => '',
			'eyebrow'      => '',
			'h1'           => '',
			'lede'         => '',
			'ctaLabel'     => '',
			'visualWord'   => '',
			'delTitle'     => '',
			'deliverables' => [],
			'procTitle'    => '',
			'process'      => [],
			'caseTitle'    => '',
			'caseDesc'     => '',
			'caseStats'    => [],
			'faqs'         => [],
			'ctaBottom'    => '',
			'ctaBottomBtn' => '',
		], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	}
	echo '<p>Edit the full service page data as JSON. Refer to the ServicePage component props for the expected shape.</p>';
	echo '<textarea name="digibit_svc_data" rows="30" style="width:100%;font-family:monospace;font-size:12px">' . esc_textarea( $val ) . '</textarea>';
}

add_action( 'save_post_digibit_service', function ( $post_id ) {
	if ( ! isset( $_POST['digibit_svc_nonce'] ) || ! wp_verify_nonce( $_POST['digibit_svc_nonce'], 'digibit_svc_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( isset( $_POST['digibit_svc_data'] ) ) {
		update_post_meta( $post_id, '_digibit_svc_data', wp_unslash( $_POST['digibit_svc_data'] ) );
	}
} );

add_action( 'init', function () {
	register_post_meta( 'digibit_service', '_digibit_svc_data', [
		'show_in_rest' => true,
		'single'       => true,
		'type'         => 'string',
	] );
} );
