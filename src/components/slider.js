import { Icon, arrowLeft, arrowRight } from '@wordpress/icons';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

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

	console.log('attributes', attributes);
	const [posts, setPosts] = useState([]);

	// Get url depending upon the option selected on the block
	const getURL = () => {
		if (postFrom === 'custom' && postUrl) {
			return `https://${postUrl}/wp-json/wp/v2/posts`;
		} else {
			return '/wp/v2/posts';
		}
	};

	// Fetch posts depending on the URL
	const fetchData = async () => {
		if (postFrom === 'custom') {
			const response = await fetch(getURL());
			const posts = await response.json();
			setPosts(posts);
		} else {
			console.log('not custom');
			apiFetch({ path: getURL() }).then((posts) => setPosts(posts));
		}
	};

	// refetch data when posts, post from or post url changes
	useEffect(() => {
		fetchData();
		console.log('rerendered');
	}, [postFrom, postUrl]);

	console.log(posts);
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
					<div className="sethstha-slide" key={post.id}>
						<h3>{post.title.rendered}</h3>
					</div>
				))}
			</div>
		</div>
	);
}
