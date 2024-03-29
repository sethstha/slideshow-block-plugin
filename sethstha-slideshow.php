<?php
/**
 * Plugin Name:       Sethstha Posts Slideshow
 * Description:       User friendly Responsive WordPress Rest API based slideshow plugin with touch and keyboard navigation support.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Sanjeev Shrestha
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sethstha-slideshow
 *
 * @package           sethstha
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function sethstha_slideshow_slideshow_block_init() {
	register_block_type( __DIR__ . '/build', array(
	) );
}
add_action( 'init', 'sethstha_slideshow_slideshow_block_init' );
