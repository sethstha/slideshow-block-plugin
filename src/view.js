// fetches posts
async function getPosts() {
	const response = await fetch('https://wptavern.com/wp-json/wp/v2/posts');
	const post = await response.json();
	return post;
}

// fetches featured image
async function getFeaturedImage(id) {
	const response = await fetch(
		`https://wptavern.com/wp-json/wp/v2/media/${id}`
	);
	const image = await response.json();
	return image.source_url;
}

// Fetches posts and feauted image and returns an array
async function fetchPosts() {
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
}

// Generates HTML markup for slide
function generateSlidesHTML(slide) {
	try {
		const container = document.getElementById('sethstha-slides');
		const featuredImage = slide.featuredImage
			? `<img src="${slide.featuredImage}" />`
			: null;
		container.innerHTML += `<div class="sethstha-slide ${featuredImage ? 'has-thumbnail' : ''}">
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
}

function generatePaginationHTML(number) {
	try {
		const container = document.getElementById('sethstha-pagination');
		container.innerHTML = ''; //Clear the div first
		for (let i = 0; i < number; i++) {
			container.innerHTML += `<button type="button" class="sethstha-pagination-indicator" aria-label="Navigate to slide ${i}" aria-selected="false"></button>`;
		}
	} catch (error) {
		console.error(error);
	}
}

// Actual logic of rendering slides
function renderSlides() {
	try {
		const container = document.getElementById('sethstha-slides');
		const slides = localStorage.getItem('sethstha-slides');

		// When there is data saved to localstorage
		if (slides && slides.length) {
			const parsedSlides = JSON.parse(slides);
			parsedSlides.map((slide) => generateSlidesHTML(slide));
			generatePaginationHTML(parsedSlides.length);

			/* Check whether local storage data is upto date or not
			 * If not replace it with newer data
			 */
			fetchPosts().then((comparingSlides) => {
				if (comparingSlides !== slides) {
					container.innerHTML = ''; //Empty out the container
					comparingSlides.map((slide) => generateSlidesHTML(slide));
					generatePaginationHTML(comparingSlides.length);
				}
			});
		} else {
			// When there is no data on local storage
			fetchPosts().then((newSlides) => {
				container.innerHTML = ''; //Empty out the container
				newSlides.map((slide) => generateSlidesHTML(slide));
				generatePaginationHTML(newSlides.length);
				localStorage.setItem('sethstha-slides', JSON.stringify(newSlides));
			});
		}
	} catch (error) {
		console.error(error);
	}
}
renderSlides();

document.addEventListener('DOMContentLoaded', function () {
	console.log('i am working');
	const slides = document.getElementById('sethstha-slides');
	const items = document.querySelectorAll('.sethstha-slide');
	const prevButton = document.getElementById('sethstha-slider-prev');

	let activeIndex = 0;
	let currentTransform = -activeIndex * 100;

	const updateIndex = (index) => {
		activeIndex = index;
	};

	const updateTransform = () => {
		currentTransform = -activeIndex * 100;
	};

	const onPrevPress = () => {
		updateIndex((activeIndex - 1 + items.length) % items.length);
		updateTransform();
		console.log(currentTransform);
		slides.style.transform = `translateX(${currentTransform}%)`;
		console.log(activeIndex);
	};

	prevButton.addEventListener('click', onPrevPress);
});
