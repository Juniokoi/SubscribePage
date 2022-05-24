import bodyParser from 'body-parser';
import express from "express";
import https from 'https';
import path from 'path';
import 'dotenv/config';
import { response } from 'express';


const __dirname = path.resolve( path.dirname( '' ) );


const app = express();
app.use( express.static( 'src' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
const PORT = 3333;

app.get( '/', ( req, res ) => {
  res.sendFile( `${__dirname}/src/pages/index.html` );
} );

app.post( "/", ( req, res ) => {
  const name = req.body.name;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          NAME: name
        }
      },
    ]
  };
  const jsonData = JSON.stringify( data );
  const url = `https://us${process.env.US_KEY}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}`;
  const options = {
    method: "POST",
    auth: `koikoi:${process.env.MAILCHIMP_API_KEY}`
  };
  const request = https.request( url, options, ( response ) => {

    if ( response.statusCode === 200 ) {
      res.sendFile( __dirname + '/src/pages/success.html' );
    } else {
      res.sendFile( __dirname + '/src/pages/failure.html' );
    }


    response.on( "data", ( data ) => {
      console.log( JSON.parse( data ) );
    } );



  } );

  request.write( jsonData );
  request.end();

} );


app.listen( PORT, () => {
  console.log( `server is running on PORT: ${PORT}` );
} );

//API KEY 
// 7f72d4999e65c056152b52599d24a48e-us17

// LIST ID
// a907e6d26f