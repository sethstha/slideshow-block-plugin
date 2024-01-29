export default function Save({ attributes }) {
	console.log(attributes);
	return (
		<div id="sethstha-slider-wrapper" class="sethstha-slider-wrapper">
			<div class="sethstha-slider">
				<div id="sethstha-slides" class="sethstha-slides"></div>
				{attributes.showNav ? (
					<div>
						<button
							id="sethstha-slider-prev"
							class="sethstha-slider-nav sethstha-slider-nav--prev"
						></button>
						<button
							id="sethstha-slider-prev"
							class="sethstha-slider-nav sethstha-slider-nav--prev"
						></button>
					</div>
				) : null}
				{attributes.showPag ? (
					<div id="sethstha-pagination" class="sethstha-pagination"></div>
				) : null}
			</div>
		</div>
	);
}
