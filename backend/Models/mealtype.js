const mongoose = require('mongoose');

const Schema = mongoose.Schema; //Copying or importing the mongoose schemas

const mealtypeschema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('mealtype', mealtypeschema, 'mealtype');