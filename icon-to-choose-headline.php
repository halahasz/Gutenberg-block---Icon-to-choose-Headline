<?php
/**
 * Plugin Name: Icon to choose headline
 * Text Domain: polandtravel
 * Author: Halina Balys
 * Version: 1.0.0
 
 *
 * @package polandtravel
 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;

// Only load if Gutenberg is available.
if ( ! function_exists( 'register_block_type' ) ) {
	return;
}


function jsforwphowto_templates( $args, $post_type ) {

  if ( $post_type == 'post' ) {
    $args['template_lock'] = true;
    $args['template'] = [
      [
        'core/image', [
          'align' => 'left',
        ]
      ],
      [
        'core/paragraph', [
          'placeholder' => 'The only thing you can add',
        ]
      ]
    ];
  }

  return $args;

}
//add_filter( 'register_post_type_args', 'jsforwphowto_templates', 20, 2 );

/**
 * Enqueue block editor only JavaScript and CSS
 */
function jsforwphowto_editor_scripts()
{

    // Make paths variables so we don't write em twice ;)
    $blockPath = '/assets/js/editor.blocks.js';
    $editorStylePath = '/assets/css/blocks.editor.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'jsforwphowto-blocks-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );

    // Enqueue optional editor only styles
    wp_enqueue_style(
        'jsforwphowto-blocks-editor-css',
        plugins_url( $editorStylePath, __FILE__),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . $editorStylePath )
    );

}

// Hook scripts function into block editor hook
add_action( 'enqueue_block_editor_assets', 'jsforwphowto_editor_scripts' );


/**
 * Enqueue front end and editor JavaScript and CSS
 */
function jsforwphowto_scripts()
{
    $blockPath = '/assets/js/frontend.blocks.js';
    // Make paths variables so we don't write em twice ;)
    $stylePath = '/assets/css/blocks.style.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'jsforwphowto-blocks-frontend-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api', 'wp-editor' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );

    // Enqueue frontend and editor block styles
    wp_enqueue_style(
        'jsforwphowto-blocks-css',
        plugins_url($stylePath, __FILE__),
        null,
        filemtime(plugin_dir_path(__FILE__) . $stylePath )
    );

}

// Hook scripts function into block editor hook
add_action('enqueue_block_assets', 'jsforwphowto_scripts');
