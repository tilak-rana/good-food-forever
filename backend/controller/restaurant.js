const Restaurants = require('../Models/restaurant');

exports.getRestaurantsById = (req, res) => {
    const { LocId } = req.params;

    Restaurants.find({ city: LocId }, {})
        .then(response => {
            res.status(200).json({
                message: "restaurant fetched successfully accordind to its location",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

};

exports.postFilterRestuarant = (req, res) => {
    var { mealtype, location, cuisine, hcost, lcost, sort, page } = req.body;

    sort = sort ? sort : 1; //if (1),Asending Order.if(-1),Desending Order
    page = page ? page : 1; //Starting from page no. 1

    const itemsPerPage = 2; //Number of restaurant per page
    let startIndex = page * itemsPerPage - itemsPerPage;
    let endIndex = page * itemsPerPage;

    let filterObj = {};

    mealtype && (filterObj["type.mealtype"] = mealtype);
    location && (filterObj["city"] = location);
    cuisine && (filterObj["Cuisine.cuisine"] = { $in: cuisine });
    hcost && lcost && (filterObj["cost"] = { $lte: hcost, $gte: lcost });

    console.log(filterObj);

    Restaurants.find(filterObj).sort({ cost: sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({
                message: "restaurant fetched successfully accordind to its Id",
                restaurants: filteredResponse
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getRestaurantDetailsByID = (req, res) => {
    const { RestId } = req.params;

    Restaurants.find({ _id: RestId }, {})
        .then(response => {
            res.status(200).json({
                message: "restaurant fetched successfully accordind to its Id",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}