import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	category: metadata.category,
	icon: 'hammer',
	supports: {
		html: metadata.supports.html,
	},
	attributes: null,
	edit: Edit,
});
