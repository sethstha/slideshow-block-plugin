import { Icon, arrowLeft, arrowRight } from '@wordpress/icons';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import Slide from './slide';

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
	} = attributes;

	const [posts, setPosts] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
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
			apiFetch({ path: getURL() }).then((posts) => setPosts(posts));
		}
	};

	// refetch data when posts, post from or post url changes
	useEffect(() => {
		fetchData();
	}, [postFrom, postUrl]);

	const onPrevPress = () => {
		console.log('prev pressed');
		setActiveIndex(
			(prevIndex) => (prevIndex - 1 + posts.length) % posts.length
		);
	};

	const onNextPress = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % posts.length);
	};

	// Use index for css to transform
	const currentTransform = -activeIndex * 100;

	// Handle keyboard navigation
	const handleKeyPress = (event) => {
		if (event.key === 'ArrowRight') {
			onNextPress();
		} else if (event.key === 'ArrowLeft') {
			onPrevPress();
		}
	};

	const renderPagination = () => {
		return (
			<div className="sethstha-pagination">
				{posts.map((_, index) => (
					<button
						type="button1"
						key={index}
						className={`sethstha-pagination-indicator ${index === activeIndex ? 'active' : ''}`}
						onClick={() => setActiveIndex(index)}
					></button>
				))}
			</div>
		);
	};
	return (
		<div
			className="sethstha-slider-wrapper"
			onKeyDown={handleKeyPress}
			tabIndex="0"
			aria-description="Post Slideshow"
		>
			<div className="sethstha-slider">
				{showNav ? (
					<>
						<button
							type="button"
							className="sethstha-slider-nav sethstha-slider-nav--prev"
							onClick={onPrevPress}
							aria-label="Go to previous slide"
						>
							<Icon icon={arrowLeft} />
						</button>
						<button
							type="button"
							className="sethstha-slider-nav sethstha-slider-nav--next"
							onClick={onNextPress}
							aria-label="Go to next slide"
						>
							<Icon icon={arrowRight} />
						</button>
					</>
				) : null}

				<div
					className="sethstha-slides"
					style={{ transform: `translateX(${currentTransform}%)` }}
				>
					{posts.map((post) => (
						<Slide
							key={post.id}
							link={post.link}
							title={post.title.rendered}
							featuredImage={post.featured_media}
							desc={post.excerpt.rendered}
							attributes={attributes}
						/>
					))}
				</div>
				{showPag ? renderPagination() : null}
			</div>
		</div>
	);
}
