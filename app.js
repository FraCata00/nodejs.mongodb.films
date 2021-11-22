const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const { MongoClient } = require('mongodb');
const port = 3000; //port

require('dotenv/config');

app.set('view engine', 'ejs');


//Middlewares
app.use(cors());
app.use(bodyParser.json());

//import routes
const moviesRoute = require('./routes/movies');
app.use('/movies', moviesRoute);

const actorsRoute = require('./routes/actors');
app.use('/actors', actorsRoute);

//another GET FRONTEND

//routes GET
app.get('/', (req, res) => {
    res.send('<h2>We are on home</h2>' + '<p>Find Actors</p>' + '<p>Find Movies</p>');
    //res.send('views/pages/index.ejs', { root: __dirname })
    //res.send('<p>Find Actors</p>');
    //res.send('Find Movies');
});

//connect
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connect to mongodb Atlas'),
        console.log('..welcome user..')
});

//also connect with function
async function main() {

    const uri = process.env.DB_CONNECTION
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await findMovies(client);
        await findActors(client);

    } finally {
        await client.close();
    }
}

main().catch(console.error);

//function to find movies in HTML output
async function findMovies(client) {
    const cursor = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION).find({});
    const results = await cursor.toArray();

    if (results.length > 0) {
        results.forEach((result, i) => {

            console.log(result);

        });
    } else {
        console.log('No movies found');
    }
}

async function findActors(client) {
    const cursor = client.db(process.env.DB_NAME).collection('actors').find({});
    const results = await cursor.toArray();

    if (results.length > 0) {
        results.forEach((result, i) => {

            console.log(result);

        });
    } else {
        console.log('No actors found');
    }
}

//port server running
app.listen(port);