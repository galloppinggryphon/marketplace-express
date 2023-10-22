function handleError( req, res ) {}

function getErrorMessage( errMsg ) {
	console.log( errMsg )
}

// Export the controller function
export default {
	handleError: handleError,
	getErrorMessage: getErrorMessage,
}
