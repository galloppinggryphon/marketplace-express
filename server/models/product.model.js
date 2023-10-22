import mongoose from 'mongoose'

const schema = new mongoose.Schema( {
	name: {
		type: String,
		trim: true,
		required: 'name is required',
	},
	description: {
		type: String,
		trim: true,
		required: 'description is required',
	},
	price: {
		type: Number,
		required: 'price is required',
	},
	quantity: {
		type: Number,
		required: 'quantity is required',
	},
	category: {
		type: String,
		trim: true,
		required: 'category is required',
	},
} )

export default mongoose.model( 'Product', schema )
