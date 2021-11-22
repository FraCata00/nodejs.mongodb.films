const express = require('express');
const router = express.Router();
const Actor = require('../models/Actor');

//GET
router.get('/', async (req, res) => {
    try {
        const actors= await Actor.find();
        res.json(actors);
    } catch (error) {
        res.json({ message: error })
    }
});

//POST
router.post('/', async (req, res) => {
    const actors = new Actor({
        name: req.body.name,
        birthYear: req.body.birthYear,
        deathYear: req.body.deathYear,
        profession: req.body.profession,
        films: req.body.films,
    });
    try {
        const savedActor = await actors.save();
        res.json(savedActor);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET with ID
router.get('/:actorId', async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.actorId);
        res.json(actor);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE
router.delete('/actorId', async (req, res) => {
    try {
        const removedActor = await Actor.remove({ _id: req.params.actorId });
        res.json(removedActor);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT
router.patch('/actorId', async (req, res) => {
    try {
        const updatedActor = await Actor.updateOne({ _id: req.params.actorId },
            { $set: { name: req.body.name } },
            { $set: { birthYear: req.body.birthYear } },
            { $set: { deathYear: req.body.deathYear } },
            { $set: { profession: req.body.profession } },
            { $set: { films: req.body.films } });
        res.json(updatedActor);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;