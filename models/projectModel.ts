import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
	status: {
		type: String,
		required: true
	},
	creationDate: {
		type: String,
		required: true
	},
	projectName: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	aprtmentType: {
		type: String,
		required: false
	},
	service: {
		type: String,
		required: true
	},
	bathrooms: {
		type: Number,
		required: true
	},
	images: {
		type: [String],
		required: true
	},
	projectType: {
		type: String,
		required: true
	},
	creator: {
		firstname: {
			type: String,
			required: true
		},
		lastname: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		}
	},
	checkboxes: {
		isExplore: {
			type: Boolean,
			required: true,
		},
		isAccept: {
			type: Boolean,
			required: true,
		},
	},
	buildYear: {
		type: Number,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	neighbourhood: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	floors: {
		type: Number,
		required: true
	},
	square: {
		type: Number,
		required: true
	},
	bedrooms: {
		type: Number,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	garage: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	pros: {
		type: [String],
		required: false
	},
	previewPhoto: {
		type: String,
		required: true
	},
	videoLinks: {
		type: [String],
		required: false
	},
})

export const ProjectModel = mongoose.model('Projects', projectSchema);