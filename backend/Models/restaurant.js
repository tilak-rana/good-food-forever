const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantschema = new Schema({
          city: {
              type: Number,
              required: true
          },
          id: {
              type: Number,
               required: true
          }
})

module.exports = mongoose.model('restaurant',restaurantschema,'restaurant');