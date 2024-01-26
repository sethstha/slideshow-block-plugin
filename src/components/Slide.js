import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';

export default function Slide({ title, link, featuredImage }) {
	const [image, setImage] = useState();

	useEffect(() => {
		if (featuredImage !== 0) {
			apiFetch({
				path: `/wp/v2/media/${featuredImage}`,
			}).then((image) => {
				setImage(image);
			});
		}
	}, []);

	return (
		<div className="sethstha-slide">
			<a href={link} target="_blank">
				<h3>{title}</h3>
			</a>
			<figure>
				{image ? (
					<img
						width={image.media_details.width}
						height={image.media_details.height}
						src={image.source_url}
						alt={title}
						srcSet={`${image.media_details.sizes.full.source_url} ${image.media_details.sizes.full.width}w, ${image.media_details.sizes.thumbnail.source_url} ${image.media_details.sizes.thumbnail.width}w`}
						sizes={`(max-width: ${image.media_details.width}px) 100vw, ${image.media_details.width}px`}
					/>
				) : null}
			</figure>
		</div>
	);
}
