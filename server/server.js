const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const multer = require( 'multer' );
const uuidv4 = require( 'uuid/v4' );
const path = require( 'path' );
const fs = require( 'fs' );
const cors = require( 'cors' )

const app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'public' ) );
// app.use( cors() )

const port = process.env.PORT || 3000;

const upload = multer( {
	limits: {
		fileSize: 4 * 1024 * 1024,
	}
} );

app.listen( port, function() {
	console.log( 'Server is running on PORT', port );
} );

app.get( '/', async function( req, res ) {
	console.log( 1 );
} );

app.post( '/image', upload.single( 'file' ), async function( req, res ) {
	if ( !req.file ) {
		return res.status( 401 ).json( { error: 'Missing image.' } );
	}

	const imageName = `${ uuidv4() }.png`;
	const imagePath = path.join( 'public/images', imageName );

	await fs.writeFile( imagePath, req.file.buffer, () => {
		res.setHeader( 'Access-Control-Allow-Origin', '*' );
		res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT' );
		res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );
		res.status( 200 ).json( { url: 'http://localhost:3000/' + imagePath } );
	} );
} );

app.options( '/image', ( req, res ) => {
	// res.setHeader( 'Access-Control-Allow-Credentials', false );
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT' );
	res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );

	res.end();
} );
