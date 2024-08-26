const mongoose = require('mongoose');

const Schema = mongoose.Schema; //Copying or importing the mongoose schemas

const userschema = new Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
     password:{
         type: String,
         required: true
     },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Userdetails', userschema,'user');