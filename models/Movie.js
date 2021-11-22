const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    actors: {
        type: Array,
        required: true,
        items: {
            type: Object,
            proprerties: {
                name: { 
                    type: String 
                },
                birthYear: {
                    type: String 
                },
                deathYear: {
                    type: Number
                },
                profession: {
                    type: String
                }
            }
        }
    },
});

module.exports = mongoose.model('Movie', movieSchema);