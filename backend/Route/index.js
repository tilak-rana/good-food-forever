const express = require("express");

const locationController = require("../controller/location");
const restaurantController = require("../controller/restaurant");
const mealtypeController = require("../controller/mealtype");
const UserController = require("../controller/user");
const menuController =require("../controller/menu");
const { createOrder } = require('../controller/orderController');

const route = express.Router();

route.get('/location',locationController.getlocations);
route.get('/restaurant/:LocId',restaurantController.getRestaurantsById);
route.get('/mealtype',mealtypeController.getmealType);
route.post('/signup',UserController.postSignUp);
route.post('/login',UserController.postLogin);
route.post('/filter',restaurantController.postFilterRestuarant);
route.get('/restaurants/:RestId',restaurantController.getRestaurantDetailsByID);
route.get('/menu/:resId', menuController.getMenuByResId);
route.post('/orders', createOrder);

module.exports = route;