const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

//GET
router.get('/', async(req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.json({ message: error })
    }
});

//POST
router.post('/', async(req, res) => {
    const movies = new Movie({
        title: req.body.title,
        year: req.body.year,
        actors: req.body.actors,
    });
    try {
        const savedMovie = await movies.save();
        res.json(savedMovie);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET with ID
router.get('/:movieId', async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        res.json(movie);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE
router.delete('/movieId', async(req, res) => {
    try {
        const removedMovie = await Movie.remove({ _id: req.params.movieId });
        res.json(removedMovie);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT
router.patch('/movieId', async(req, res) => {
    try {
        const updatedMovie = await Movie.updateOne({ _id: req.params.customerId }, 
            { $set: { title: req.body.title } }, 
            { $set: { year: req.body.year } }, 
            { $set: { actors: req.body.actors } },  );
        res.json(updatedMovie);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;