import bodyParser from 'body-parser';
import express from "express";
import axios from "axios";
import path from 'path';

const __dirname = path.resolve( path.dirname( '' ) );


const app = express();
app.use( bodyParser.urlencoded( { extended: true } ) );
const PORT = 3333;

app.get( '/', ( req, res ) => {
  res.sendFile( `${__dirname}/index.html` );
} );




app.listen( PORT, () => {
  console.log( `server is running on PORT: ${PORT}` );
} );