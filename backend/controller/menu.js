const MenuItems = require ("../Models/menuItems")

exports.getMenuByResId = (req, res) => {
    const { resId } = req.params;

    MenuItems.find({ restaurantId: resId }, {})
        .then(response => {
            res.status(200).json({
                message: "Menu Fetched Successfully",
                menuitems: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}