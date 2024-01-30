import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';

export default function Slide({
	title,
	link,
	featuredImage,
	desc,
	date,
	attributes,
}) {
	const [image, setImage] = useState();
	const { postUrl, showPostExcerpt } = attributes;
	const formattedDate = new Date(date);

	// Fetch image depending upon the option
	const fetchImage = async () => {
		if (featuredImage !== 0) {
			const response = await fetch(
				`https://${postUrl}/wp-json/wp/v2/media/${featuredImage}`
			);
			const image = await response.json();
			setImage(image);
		}
	};

	useEffect(() => {
		fetchImage();
	}, []);

	return (
		<div
			className={`sethstha-slide ${image ? 'has-thumbnail' : 'has-no-thumbnal'}`}
		>
			<figure>
				{image ? (
					<a href={link} target="_blank">
						<img
							width={image.media_details.width}
							height={image.media_details.height}
							src={image.source_url}
							alt={title}
							srcSet={`${image.media_details.sizes.full.source_url} ${image.media_details.sizes.full.width}w, ${image.media_details.sizes.thumbnail.source_url} ${image.media_details.sizes.thumbnail.width}w`}
							sizes={`(max-width: ${image.media_details.width}px) 100vw, ${image.media_details.width}px`}
						/>
					</a>
				) : null}
			</figure>

			<div className="sethstha-slide-description">
				<div>
					{title ? (
						<a href={link} target="_blank" className="sethstha-slide-title">
							{title}
						</a>
					) : null}
					{date ? (
						<div className="sethstha-slide-date">
							<span>{formattedDate.toLocaleDateString()}</span>
						</div>
					) : null}
					{desc && showPostExcerpt ? (
						<div
							className="sethstha-slide-excerpt"
							dangerouslySetInnerHTML={{ __html: desc }}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}
