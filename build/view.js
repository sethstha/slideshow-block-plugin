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
  const container = document.getElementById('sethstha-slides');
  container.innerHTML += `<div>${slide.title}</div>`;
}

// Actual logic of rendering slides
function renderSlides() {
  const container = document.getElementById('sethstha-slides');
  const slides = localStorage.getItem('sethstha-slides');

  // When there is data saved to localstorage
  if (slides && slides.length) {
    const parsedSlides = JSON.parse(slides);
    parsedSlides.map(slide => generateSlidesHTML(slide));

    /* Check whether local storage data is upto date or not
     * If not replace it with newer data
     */
    fetchPosts().then(comparingSlides => {
      if (comparingSlides !== slides) {
        container.innerHTML = ''; //Empty out the container
        comparingSlides.map(slide => generateSlidesHTML(slide));
      }
    });
  } else {
    // When there is no data on local storage
    fetchPosts().then(newSlides => {
      container.innerHTML = ''; //Empty out the container
      newSlides.map(slide => generateSlidesHTML(slide));
      localStorage.setItem('sethstha-slides', JSON.stringify(newSlides));
    });
  }
}
renderSlides();
/******/ })()
;
//# sourceMappingURL=view.js.map