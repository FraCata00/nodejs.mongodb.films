const mongoose = require('mongoose');
const actorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthYear: {
        type: Number,
        required: true
    },
    deathYear: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    films: {
        type: Array,
        required: true,
        items: {
            type: Object,
            proprerties: {
                title: {
                    type: String
                },
                year: {
                    type: Number
                }
            }
        }
    },
});

module.exports = mongoose.model('Actor', actorSchema);