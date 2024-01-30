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
				{attributes.showNav ? (
					<div>
						<button
							id="sethstha-slider-prev"
							class="sethstha-slider-nav sethstha-slider-nav--prev"
						>
							<span class="dashicons  dashicons-arrow-left-alt"></span>
						</button>
						<button
							id="sethstha-slider-next"
							class="sethstha-slider-nav sethstha-slider-nav--next"
						>
							<span class="dashicons  dashicons-arrow-right-alt"></span>
						</button>
					</div>
				) : null}
				{attributes.showPag ? (
					<div id="sethstha-pagination" class="sethstha-pagination"></div>
				) : null}
			</div>
		</div>
	);
}
