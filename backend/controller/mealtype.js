const Mealtypes = require("../Models/mealtype");

exports.getmealType = (req, res) =>{

      Mealtypes.find({},{})
            .then(response =>{
                   res.status(200).json({
                   message:"mealtype fetched successfully",
                   mealtype:response
                })
            })
            .catch(err =>{
                  res.status(500).json({error: err});
            })
}