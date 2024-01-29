/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
// fetches posts
async function getPosts() {
  const response = await fetch('https://wptavern.com/wp-json/wp/v2/posts');
  const post = await response.json();
  return post;
}

// fetches featured image
async function getFeaturedImage(id) {
  const response = await fetch(`https://wptavern.com/wp-json/wp/v2/media/${id}`);
  const image = await response.json();
  return image.source_url;
}

// Fetches posts and feauted image and returns an array
async function fetchPosts() {
  const posts = await getPosts();
  const filteredPosts = await Promise.all(posts.map(async post => {
    return {
      id: post.id,
      title: post.title.rendered,
      description: post.excerpt.rendered,
      ...(post.featured_image !== 0 && {
        featuredImage: await getFeaturedImage(post.featured_media)
      })
    };
  }));
  return filteredPosts;
}

// Generates HTML markup for slide
function generateSlidesHTML(slide) {
  try {
    const container = document.getElementById('sethstha-slides');
    const featuredImage = slide.featuredImage ? `<img src="${slide.featuredImage}" />` : null;
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
      parsedSlides.map(slide => generateSlidesHTML(slide));
      generatePaginationHTML(parsedSlides.length);

      /* Check whether local storage data is upto date or not
       * If not replace it with newer data
       */
      fetchPosts().then(comparingSlides => {
        if (comparingSlides !== slides) {
          container.innerHTML = ''; //Empty out the container
          comparingSlides.map(slide => generateSlidesHTML(slide));
          generatePaginationHTML(comparingSlides.length);
        }
      });
    } else {
      // When there is no data on local storage
      fetchPosts().then(newSlides => {
        container.innerHTML = ''; //Empty out the container
        newSlides.map(slide => generateSlidesHTML(slide));
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
  const slides = document.getElementById('sethstha-slides');
  const items = document.querySelectorAll('.sethstha-slide');
  const prevButton = document.getElementById('sethstha-slider-prev');
  const nextButton = document.getElementById('sethstha-slider-next');
  let activeIndex = 0,
    currentTransform = -activeIndex * 100,
    touchStart = null,
    touchEnd = null;

  // Updates current index;
  const updateIndex = index => {
    activeIndex = index;
  };

  // update current transform;
  const updateTransform = () => {
    currentTransform = -activeIndex * 100;
  };

  // When prev button is clicked
  const onPrevPress = () => {
    updateIndex((activeIndex - 1 + items.length) % items.length);
    updateTransform();
    slides.style.transform = `translateX(${currentTransform}%)`;
  };

  // When next button is clicked
  const onNextPress = () => {
    updateIndex((activeIndex + 1) % items.length);
    updateTransform();
    slides.style.transform = `translateX(${currentTransform}%)`;
  };
  setInterval(() => {
    onNextPress();
  }, 3000);

  // Watch for click on prev button
  prevButton.addEventListener('click', onPrevPress);
  nextButton.addEventListener('click', onNextPress);

  // Navigate slider using keyboard
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      onNextPress();
    } else if (event.key === 'ArrowLeft') {
      onPrevPress();
    }
  });
  slides.addEventListener('touchstart', e => {
    console.log('touch start');
    touchEnd = null;
    touchStart = e.targetTouches[0].clientX;
  });
  slides.addEventListener('touchmove', e => {
    touchEnd = e.targetTouches[0].clientX;
  });
  slides.addEventListener('touchend', () => {
    if (!touchStart || !touchEnd) return;
    const minSwipeDistance = 50;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      onNextPress();
    } else if (distance < -minSwipeDistance) {
      onPrevPress();
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map