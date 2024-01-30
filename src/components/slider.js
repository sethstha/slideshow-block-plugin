import { Icon, arrowLeft, arrowRight } from '@wordpress/icons';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect, useCallback } from '@wordpress/element';
import Slide from './slide';

export function Slider({ attributes }) {
	const { postUrl, showNav, showPag, autoSlide, delay } = attributes;

	const [posts, setPosts] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);

	// Fetch posts depending on the URL
	const fetchData = async () => {
		const response = await fetch(`https://${postUrl}/wp-json/wp/v2/posts`);
		const posts = await response.json();
		setPosts(posts);
	};

	// refetch data when posts, post from or post url changes
	useEffect(() => {
		fetchData();
	}, [postUrl]);

	const onPrevPress = useCallback(() => {
		setActiveIndex(
			(prevIndex) => (prevIndex - 1 + posts.length) % posts.length
		);
	}, [posts.length]);

	const onNextPress = useCallback(() => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % posts.length);
	}, [posts.length]);

	// Use index for css to transform
	const currentTransform = -activeIndex * 100;

	// Autoplay the slide
	useEffect(() => {
		if (autoSlide && delay) {
			console.log('auto play is on', parseInt(delay));
			const autoplay = setInterval(onNextPress, delay);
			return () => clearInterval(autoplay);
		}
	}, [autoSlide, delay, onNextPress]);

	// Handle keyboard navigation
	const handleKeyPress = (event) => {
		if (event.key === 'ArrowRight') {
			onNextPress();
		} else if (event.key === 'ArrowLeft') {
			onPrevPress();
		}
	};

	const onTouchStart = (e) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const minSwipeDistance = 50;

		const distance = touchStart - touchEnd;

		if (distance > minSwipeDistance) {
			onNextPress();
		} else if (distance < -minSwipeDistance) {
			onPrevPress();
		}
	};

	const renderPagination = () => {
		return (
			<div className="sethstha-pagination">
				{posts.map((_, index) => (
					<button
						type="button"
						key={index}
						className={`sethstha-pagination-indicator ${index === activeIndex ? 'active' : ''}`}
						onClick={() => setActiveIndex(index)}
						aria-label={`Navigate to slide ${index + 1}`}
						aria-selected={index === activeIndex}
					></button>
				))}
			</div>
		);
	};
	return (
		<div
			className="sethstha-slider-wrapper"
			onKeyDown={handleKeyPress}
			aria-description="Post Slideshow"
			onTouchEnd={onTouchEnd}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
		>
			<div className="sethstha-slider">
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
							date={post.date}
						/>
					))}
				</div>
			</div>
			{showPag ? renderPagination() : null}
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
		</div>
	);
}
