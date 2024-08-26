// const { response } = require("express");
const Locations = require("../Models/location");

exports.getlocations = (req, res) =>{

      Locations.find({},{})
            .then(response =>{
                  // console("backend ",response)
                   res.status(200).json({
                   message:"Location fetched successfully",
                   loc:response
                })
            })
            .catch(err =>{
                  res.status(500).json({error: err});
            })
}