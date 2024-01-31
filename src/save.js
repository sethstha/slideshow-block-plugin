export default function Save({ attributes }) {
	const sliderClass = `sethstha-slider ${attributes.showPostExcertp ? '' : 'hide-excerpt'}`;
	return (
		<div
			id="sethstha-slider-wrapper"
			class="sethstha-slider-wrapper"
			data-autoplay={attributes.autoSlide}
			data-delay={attributes.delay}
			data-showtitle={attributes.showPostTitle}
			data-showexcerpt={attributes.showPostExcertp}
			data-url={attributes.postUrl}
		>
			<div class={sliderClass}>
				<div id="sethstha-slides" class="sethstha-slides">
					<div class="sethstha-loader">
						<span class="sethstha-spinner"></span>
					</div>
				</div>
				{attributes.showNav ? <div id="sethstha-navigation"></div> : null}
				{attributes.showPag ? (
					<div id="sethstha-pagination" class="sethstha-pagination"></div>
				) : null}
			</div>

			<div id="sethstha-url-changer" class="sethstha-url-changer">
				<p class="sethstha-error-msg">
					Please input valid url like wptavern.com
				</p>
				<div class="sethstha-input-group">
					<input id="sethstha-url" type="url" value={attributes.postUrl} />
					<button id="sethstha-url-btn" type="button">
						Fetch Post From This Url
					</button>
				</div>
			</div>
		</div>
	);
}
