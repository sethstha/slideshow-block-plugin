import './editor.scss';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import React, {
	SelectControl,
	PanelBody,
	__experimentalInputControl as InputControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	Spinner,
} from '@wordpress/components';
import { Slider } from './components/slider';
import { Suspense, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { BaseControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		postFrom,
		postUrl,
		showNav,
		showPag,
		autoSlide,
		delay,
		showPostTitle,
		showPostExcerpt,
	} = attributes;

	const [customURL, setCustomURL] = useState(postUrl);

	const postControlOption = [
		{
			value: 'default',
			label: 'Default',
		},
		{
			value: 'custom',
			label: 'Custom URL',
		},
	];

	const onSlideFromChange = (val) => {
		setAttributes({ postFrom: val });
	};

	const onSlideURLChange = (val) => {
		setCustomURL(val);
	};

	const onSlideShowNavChange = (val) => {
		setAttributes({ showNav: val });
	};

	const onSlideShowPagChange = (val) => {
		setAttributes({ showPag: val });
	};

	const onSlideAutoSlideChange = (val) => {
		setAttributes({ autoSlide: val });
	};

	const onSlideDelayChange = (val) => {
		setAttributes({ delay: val });
	};

	const onPostShowTitleChange = (val) => {
		setAttributes({ showPostTitle: val });
	};

	const onPostShowExcerptChange = (val) => {
		setAttributes({ showPostExcerpt: val });
	};

	const onCustomURLUpdate = () => {
		setAttributes({ postUrl: customURL });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Slideshow Options', 'sethstha')}>
					<SelectControl
						label={__('Load Posts From', 'sethstha')}
						help={__(
							'Choose from where you want to show your posts for slideslow. Default will load post from here',
							'sethstha'
						)}
						value={postFrom}
						options={postControlOption}
						onChange={onSlideFromChange}
					/>
					{postFrom === 'custom' ? (
						<>
							<InputControl
								label="Url for posts"
								help={__(
									'Enter URL from where you want to fetch your posts example wptavern.com',
									'sethstha'
								)}
								value={postUrl}
								onChange={onSlideURLChange}
								type="url"
							/>
							<BaseControl>
								<Button
									variant="primary"
									type="button"
									onClick={onCustomURLUpdate}
								>
									{__('Fetch Posts', 'sethstha')}
								</Button>
							</BaseControl>
						</>
					) : null}
					<ToggleControl
						label={__('Show Navigation', 'sethstha')}
						help={__(
							'Enabling this will show arrow navigation to navigate slideslow',
							'sethstha'
						)}
						checked={showNav}
						onChange={onSlideShowNavChange}
					/>
					<ToggleControl
						label={__('Show Pagination', 'sethstha')}
						help={__(
							'Enabling this will show pagination on slideshow',
							'sethstha'
						)}
						checked={showPag}
						onChange={onSlideShowPagChange}
					/>
					<ToggleControl
						label={__('Auto Slide', 'sethstha')}
						help={__(
							'Enabling this will show auto slide your slideshow',
							'sethstha'
						)}
						checked={autoSlide}
						onChange={onSlideAutoSlideChange}
					/>
					{autoSlide ? (
						<NumberControl
							label="Delay"
							help={__(
								'Delay (in Milliseconds) between each slides when auto slide is enabled',
								'sethstha'
							)}
							value={delay}
							min={0}
							onChange={onSlideDelayChange}
						/>
					) : null}
				</PanelBody>
				<PanelBody title={__('Slideshow Posts Options', 'sethstha')}>
					<ToggleControl
						label={__('Show Post Title', 'sethstha')}
						help={__('Enabling this will show post title on slide', 'sethstha')}
						checked={showPostTitle}
						onChange={onPostShowTitleChange}
					/>
					<ToggleControl
						label={__('Show Post Excerpt', 'sethstha')}
						help={__(
							'Enabling this will show post short description on slide',
							'sethstha'
						)}
						checked={showPostExcerpt}
						onChange={onPostShowExcerptChange}
					/>
				</PanelBody>
			</InspectorControls>
			<Suspense fallback={<Spinner />}>
				<Slider attributes={attributes} />
			</Suspense>
		</div>
	);
}
