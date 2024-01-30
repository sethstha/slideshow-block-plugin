/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/


/**
 * Slider config
 */
document.addEventListener('DOMContentLoaded', function () {
  const slider = {
    sliderWrapperId: 'sethstha-slider-wrapper',
    sliderId: 'sethstha-slides',
    slideClass: 'sethstha-slide',
    nextBtnId: 'sethstha-slider-next',
    prevBtnId: 'sethstha-slider-prev',
    paginationId: 'sethstha-pagination',
    paginationIndicatorClass: 'sethstha-pagination-indicator',
    defaultActiveIndex: 0
  };
  let sliderWrapper, sliderContainer, prevButton, nextButton, pagination, activeIndex, currentTransform, touchStart, touchEnd, slidesLength, paginationIndicators, cachedSlides, autoPlay, delay, url;

  // Initialize
  const init = () => {
    try {
      sliderWrapper = document.getElementById(slider.sliderWrapperId);
      sliderContainer = document.getElementById(slider.sliderId);
      prevButton = document.getElementById(slider.prevBtnId);
      nextButton = document.getElementById(slider.nextBtnId);
      activeIndex = slider.defaultActiveIndex;
      currentTransform = -activeIndex * 100;
      pagination = document.getElementById(slider.paginationId);
      cachedSlides = localStorage.getItem(slider.sliderId) || undefined;
      url = sliderWrapper.dataset.url || 'wptavern.com';
    } catch (error) {
      console.error(error);
    }
  };

  // Generate Slider HTML and Render it
  const renderSlidesHTML = slide => {
    try {
      const featuredImage = slide.featuredImage ? `<img src="${slide.featuredImage}" />` : null;
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
  const renderPaginationHTML = number => {
    try {
      //First clear the older html
      pagination.innerHTML = '';
      for (let i = 0; i < number; i++) {
        pagination.innerHTML += `<button type="button" class="sethstha-pagination-indicator ${i === 0 ? 'active' : ''}" aria-label="Navigate to slide ${i}" aria-selected="false"></button>`;
      }
      paginationIndicators = document.querySelectorAll(`.${slider.paginationIndicatorClass}`);
    } catch (error) {
      console.error(error);
    }
  };
  const updatePaginationStyle = () => {
    if (paginationIndicators) {
      paginationIndicators.forEach((pag, index) => {
        if (index === activeIndex) {
          pag.classList.add('active');
        } else {
          pag.classList.remove('active');
        }
      });
    }
  };

  // Navigate slider
  const navigate = direction => {
    try {
      if (direction === 'next') {
        activeIndex = (activeIndex + 1) % slidesLength;
      } else if (direction === 'prev') {
        activeIndex = (activeIndex - 1 + slidesLength) % slidesLength;
      } else {
        throw new Error('Please provide direction for navigation');
      }
      currentTransform = -activeIndex * 100;
      sliderContainer.style.transform = `translateX(${currentTransform}%)`;
      if (paginationIndicators) {
        updatePaginationStyle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Configure keyboard navigation
  const configureKeyboardNav = () => {
    // Navigate slider using keyboard
    document.addEventListener('keydown', event => {
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

  // Configure touch navigation on touch devices
  const configureTouchNav = () => {
    if (sliderContainer) {
      sliderContainer.addEventListener('touchstart', e => {
        touchEnd = null;
        touchStart = e.targetTouches[0].clientX;
      });
      sliderContainer.addEventListener('touchmove', e => {
        touchEnd = e.targetTouches[0].clientX;
      });
      sliderContainer.addEventListener('touchend', () => {
        if (!touchStart || !touchEnd) return;
        const minSwipeDistance = 50;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) {
          navigate('next');
        } else if (distance < -minSwipeDistance) {
          navigate('prev');
        }
      });
    }
  };
  const configurePagNav = () => {
    if (paginationIndicators) {
      paginationIndicators.forEach((pag, index) => {
        pag.addEventListener('click', () => {
          activeIndex = index;
          currentTransform = -index * 100;
          sliderContainer.style.transform = `translateX(${currentTransform}%)`;
          updatePaginationStyle();
        });
      });
    }
  };

  // Configures navigation
  const configureNavigation = () => {
    configureButtonNav();
    configureKeyboardNav();
    configureTouchNav();
    configurePagNav();
  };

  // Fetch posts from remote
  const getSliderData = async () => {
    // Fetch Posts
    async function getPosts() {
      const response = await fetch(`https://${url}/wp-json/wp/v2/posts`);
      const post = await response.json();
      return post;
    }

    // Fetch featured image
    async function getFeaturedImage(id) {
      const response = await fetch(`https://${url}/wp-json/wp/v2/media/${id}`);
      const image = await response.json();
      return image.source_url;
    }
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
  };
  const renderSliderHTML = slides => {
    try {
      // Clear older data
      sliderContainer.innerHTML = '';
      slidesLength = slides.length;
      slides.forEach(slide => renderSlidesHTML(slide));
      renderPaginationHTML(slides.length);
      configureNavigation();

      // Add to local storage for cache
      localStorage.setItem(slider.sliderId, JSON.stringify(slides));
    } catch (error) {
      console.error(error);
    }
  };
  const renderSlider = async () => {
    init();
    if (cachedSlides) {
      const parsedSlides = JSON.parse(cachedSlides);
      renderSliderHTML(parsedSlides);

      // Check in the background whether cached data is upto date
      const slides = await getSliderData();
      if (parsedSlides !== slides) {
        renderSliderHTML(slides);
      }
    } else {
      const slides = await getSliderData();
      renderSliderHTML(slides);
    }
  };
  renderSlider();
});
/******/ })()
;
//# sourceMappingURL=view.js.map