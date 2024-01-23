import './editor.scss';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import React, { SelectControl, PanelBody } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { contentFrom } = attributes;
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

	const onContentFromChange = (val) => {
		setAttributes({ contentFrom: val });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Options">
					<SelectControl
						label="Load Posts from"
						value={contentFrom}
						options={postControlOption}
						onChange={onContentFromChange}
					/>
					{contentFrom === 'custom' ? (
						<SelectControl
							label="Url"
							value={contentFrom}
							options={postControlOption}
							onChange={onContentFromChange}
						/>
					) : null}
				</PanelBody>
			</InspectorControls>
			{__('Posts Slideshow  – hello from the editor!', 'sethstha-slideshow')}
		</div>
	);
}
