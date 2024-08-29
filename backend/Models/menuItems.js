const mongoose = require ('mongoose');

const Schema = mongoose.Schema; // Copying or importing the mongoose Schemas

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('menuitems', menuSchema, 'menu');