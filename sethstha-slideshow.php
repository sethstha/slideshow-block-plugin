<?php

/**
 * Plugin Name:       Posts Slideshow
 * Description:       Shows slideshow of latest blog posts
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

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}


function render_sethstha_slideshow_block($attributes)
{
    // var_dump( $attributes );

    $attributed = get_block_wrapper_attributes($attributes);

    var_dump($attributed);

    return sprintf('<div id="sethstha-slider-wrapper" class="sethstha-slider-wrapper" %1$s>
		<div class="sethstha-slider">
			<div id="sethstha-slides" class="sethstha-slides">

			</div>
			<button id="sethstha-slider-prev" class="sethstha-slider-nav sethstha-slider-nav--prev">Prev</button>
			<button id="sethstha-slider-prev" class="sethstha-slider-nav sethstha-slider-nav--prev">Next</button>
			<div id="sethstha-pagination" class="sethstha-pagination"></div>
		</div>
	</div>', $attributed);
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function sethstha_slideshow_slideshow_block_init()
{
    register_block_type(__DIR__ . '/build', array(
        // 'render_callback' => 'render_sethstha_slideshow_block',
    ));
}
add_action('init', 'sethstha_slideshow_slideshow_block_init');
