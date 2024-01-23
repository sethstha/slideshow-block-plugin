import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import React from '@wordpress/components';

export default function Edit() {
	return (
		<p {...useBlockProps()}>
			{__('Posts Slideshow  – hello from the editor!', 'sethstha-slideshow')}
		</p>
	);
}
