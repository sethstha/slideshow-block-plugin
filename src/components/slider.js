import { Icon, arrowLeft, arrowRight } from '@wordpress/icons';
import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';

export function Slider({ attributes }) {
	const {
		postFrom,
		postUrl,
		showNav,
		showPag,
		autoSlide,
		delay,
		showPostTitle,
		showPostExcerpt,
		showPostCategories,
	} = attributes;

	const url = postFrom === 'default' ? '/wp/v2/posts' : postUrl;
	const [posts, setPosts] = useState([]);

	apiFetch({ path: url }).then((posts) => {
		setPosts(posts);
	});

	return (
		<div className="sethstha-slider">
			<div className="sethstha-slider-nav seth-slider-nav--prev">
				<Icon icon={arrowLeft} />
			</div>
			<div className="sethstha-slider-nav seth-slider-nav--next">
				<Icon icon={arrowRight} />
			</div>

			<div className="sethstha-slides">
				{posts.map((post) => (
					<div className="sethstha-slide">
						<h3>{post.title.rendered}</h3>
					</div>
				))}
			</div>
		</div>
	);
}
