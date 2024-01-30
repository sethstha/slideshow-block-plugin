'use strict';

/**
 * Slider config
 */

document.addEventListener('DOMContentLoaded', function () {
	const slider = {
		sliderId: 'sethstha-slides',
		slideClass: 'sethstha-slide',
		nextBtnId: 'sethstha-slider-next',
		prevBtnId: 'sethstha-slider-prev',
		paginationId: 'sethstha-pagination',
		paginationIndicatorClass: 'sethstha-pagination-indicator',
		defaultActiveIndex: 0,
	};

	let sliderContainer,
		prevButton,
		nextButton,
		pagination,
		activeIndex,
		currentTransform,
		touchStart,
		touchEnd,
		slidesLength;

	// Initialize
	const init = () => {
		try {
			sliderContainer = document.getElementById(slider.sliderId);
			prevButton = document.getElementById(slider.prevBtnId);
			nextButton = document.getElementById(slider.nextBtnId);
			activeIndex = slider.defaultActiveIndex;
			currentTransform = -activeIndex * 100;
			pagination = document.getElementById(slider.paginationId);
		} catch (error) {
			console.error(error);
		}
	};

	// Generate Slider HTML and Render it
	const renderSlidesHTML = (slide) => {
		try {
			const featuredImage = slide.featuredImage
				? `<img src="${slide.featuredImage}" />`
				: null;
			sliderContainer.innerHTML += `<div class="sethstha-slide ${featuredImage ? 'has-thumbnail' : ''}">
      <figure>
        ${featuredImage}
        <figcaption>
        <a>${slide.title}</a>
        ${slide.description}
        </figcaption>
      </figure>
    </div>`;
		} catch (error) {
			console.error(error);
		}
	};

	// Generate Pagination and Render it
	const renderPaginationHTML = (number) => {
		try {
			//First clear the older html
			pagination.innerHTML = '';
			for (let i = 0; i < number; i++) {
				pagination.innerHTML += `<button type="button" class="sethstha-pagination-indicator" aria-label="Navigate to slide ${i}" aria-selected="false"></button>`;
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Render slider depending upon the data
	const renderSliderHTML = (slides) => {
		try {
			// Clear older data
			sliderContainer.innerHTML = '';
			slides.forEach((slide) => renderSlidesHTML(slide));
			renderPaginationHTML(slides.length);
		} catch (error) {
			console.error(error);
		}
	};

	// Navigate slider
	const navigate = (direction) => {
		try {
			if (direction === 'next') {
				activeIndex = (activeIndex + 1) % slidesLength;
			} else if (direction === 'prev') {
				activeIndex = (activeIndex - 1 + slidesLength) % slidesLength;
			} else {
				throw new Error('Please provide direction for navigation');
			}
			currentTransform = -activeIndex * 100;
			console.log('current transform', currentTransform);
			sliderContainer.style.transform = `translateX(${currentTransform}%)`;
		} catch (error) {
			console.log(error);
		}
	};

	// Get array object of data
	const getSliderData = async () => {
		// Fetch Posts
		async function getPosts() {
			const response = await fetch('https://wptavern.com/wp-json/wp/v2/posts');
			const post = await response.json();
			return post;
		}

		// Fetch featured image
		async function getFeaturedImage(id) {
			const response = await fetch(
				`https://wptavern.com/wp-json/wp/v2/media/${id}`
			);
			const image = await response.json();
			return image.source_url;
		}

		const posts = await getPosts();
		const filteredPosts = await Promise.all(
			posts.map(async (post) => {
				return {
					id: post.id,
					title: post.title.rendered,
					description: post.excerpt.rendered,
					...(post.featured_image !== 0 && {
						featuredImage: await getFeaturedImage(post.featured_media),
					}),
				};
			})
		);

		return filteredPosts;
	};

	// Configure keyboard navigation
	const configureKeyboardNav = () => {
		// Navigate slider using keyboard
		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowRight') {
				navigate('next');
			} else if (event.key === 'ArrowLeft') {
				navigate('prev');
			}
		});
	};

	// Configure button navigation
	const configureButtonNav = () => {
		if (prevButton && nextButton) {
			prevButton.addEventListener('click', () => navigate('prev'));
			nextButton.addEventListener('click', () => navigate('next'));
		}
	};

	// Configures navigation
	const configureNavigation = () => {
		configureButtonNav();
		configureKeyboardNav();
	};

	const renderSlider = async () => {
		init();
		const slides = await getSliderData();
		slidesLength = slides.length;
		console.log(slidesLength);
		configureNavigation();
		console.log(slides);
		renderSliderHTML(slides);
	};

	renderSlider();
});
