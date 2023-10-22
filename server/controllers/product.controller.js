import errorHandler from './error.controller.js'
import Product from '../models/product.model.js'
import { extend } from 'lodash-es'

async function create( req, res, next ) {
	const product = new Product( req.body )

	try {
		await product.save()
		return res.status( 200 ).json( {
			message: 'New product created.',
		} )
	}
	catch ( err ) {
		return res.status( 400 ).json( {
			error: errorHandler.getErrorMessage( err ),
		} )
	}
}

async function list ( req, res ){
	try {
		// Check for name query -> perform search
		if ( req.query.name ) {
			return find( req, res )
		}
		else if ( Object.keys( req.query ).length > 0 ) {
			return res.status( 400 ).json( {
				error: `Unrecognized query. To search use 'name=[string]' or 'name=string'.`,
			} )

			// throw new Error( `Unrecognized query. To search use 'name=[string]' or 'name=string'.` )
		}

		// Othwerwise return all
		let product = await Product.find()

		res.json( product )
	}
	catch ( err ) {
		return res.status( 400 ).json( {
			error: errorHandler.getErrorMessage( err ),
		} )
	}
}

async function productByID( req, res, next, id ) {
	try {
		let product = await Product.findById( id )
		if ( ! product ) {
			return res.status( 400 ).json( {
				error: 'Product not found',
			} )
		}
		req.profile = product
		next()
	}
	catch ( err ) {
		return res.status( 400 ).json( {
			error: 'Could not retrieve product',
		} )
	}
}

async function find( req, res, next ) {
	try {
		// todo: query string inputs should be sanitized
		const { name = '' } = req.query

		// If enclosed in brackets, treat as partial search
		const partialSearchRx = /^\[(.*)\]$/
		let queryRx

		if ( partialSearchRx.test( name ) ) {
			const term = name.match( partialSearchRx )[ 1 ]
			queryRx = new RegExp( term, 'i' )
		}
		// Exact match, case insensitive
		else {
			queryRx = new RegExp( `^${ name }$`, 'i' )
		}

		let products = await Product.find( { name: queryRx } )

		if ( ! products || ! products.length ) {
			return res.status( 400 ).json( {
				error: 'No products matched your query.',
			} )
		}

		res.json( products )
	}
	catch ( err ) {
		return res.status( 400 ).json( {
			error: 'Could not retrieve product',
		} )
	}
}

async function read ( req, res ) {
	return res.json( req.profile )
}

async function update( req, res ) {
	try {
		let product = req.profile
		product = extend( product, req.body )
		product.updated = Date.now()
		await product.save()

		// res.json( product )
		return res.status( 200 ).json( {
			message: 'Product updated.',
		} )
	}
	catch ( err ) {
		return res.status( 400 ).json( {
			error: errorHandler.getErrorMessage( err ),
		} )
	}
}

async function remove( req, res ) {
	try {
		let product = req.profile
		await Product.deleteOne( { _id: product._id } )

		return res.status( 200 ).json( {
			message: 'Product deleted.',
		} )
	}
	catch ( err ) {
		return res.status( 400 ).json( {
			error: errorHandler.getErrorMessage( err ),
		} )
	}
}

async function removeAll( req, res ) {
	try {
		const deleted = await Product.deleteMany( { name: /.*/ } )

		if ( ! deleted?.acknowledged ) {
			throw new Error( 'Something went wrong.' )
		}

		console.log( deleted )

		const message = deleted.deletedCount > 0
			? `Deleted ${ deleted.deletedCount } products.`
			: 'Nothing to delete.'

		return res.status( 200 ).json( { message } )

	}
	catch ( err ) {
		return res.status( 400 ).json( {
			error: errorHandler.getErrorMessage( err ),
		} )
	}
}

export default { create, find, list, productByID, read, remove, removeAll, update }
