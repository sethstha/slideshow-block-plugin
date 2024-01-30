export default function Save({ attributes }) {
	console.log(attributes);
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
			<div class="sethstha-slider">
				<div id="sethstha-slides" class="sethstha-slides"></div>
				{attributes.showNav ? <div id="sethstha-navigation"></div> : null}
				{attributes.showPag ? (
					<div id="sethstha-pagination" class="sethstha-pagination"></div>
				) : null}
			</div>

			<div class="sethstha-url-changer">
				<input id="sethstha-url" type="url" value={attributes.postUrl} />
				<button id="sethstha-url-btn" type="button">
					Fetch Post From This Url
				</button>
			</div>
		</div>
	);
}
