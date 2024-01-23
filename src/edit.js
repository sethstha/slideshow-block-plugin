import './editor.scss';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import React, {
	SelectControl,
	PanelBody,
	__experimentalInputControl as InputControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { postFrom, postUrl, showNav, showPag, autoSlide } = attributes;
	const postControlOption = [
		{
			value: 'default',
			label: 'Current Installation',
		},
		{
			value: 'custom',
			label: 'Custom',
		},
	];

	const onPostFromChange = (val) => {
		setAttributes({ postFrom: val });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Options">
					<SelectControl
						label="Load Posts from"
						value={postFrom}
						options={postControlOption}
						onChange={onPostFromChange}
					/>
					{postFrom === 'custom' ? <InputControl label="Url for posts" value={postUrl} /> : null}
					<ToggleControl label="Show Navigation" value={showNav} />
					<ToggleControl label="Show Pagination" value={showPag} />
					<ToggleControl label="Auto Slide" value={autoSlide} />
				</PanelBody>
			</InspectorControls>
			{__('Posts Slideshow  – hello from the editor!', 'sethstha-slideshow')}
		</div>
	);
}
