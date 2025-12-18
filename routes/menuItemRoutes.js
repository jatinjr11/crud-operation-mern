const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();


// POST method to add a Menu Item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data)
        const response = await newMenu.save();
        console.log("Menu Item data saved:", response);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

// GET method to get the menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Menu item data fetched:", data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:taste', async (req,res) => {
    try{
        const taste = req.params.taste;
        if(taste == 'spicy' || taste == 'sweet' || taste == 'sour'){
            const response = await MenuItem.find({taste: taste})
            console.log("Your response based on taste is fetched: ", response);
            res.status(200).json(response);
        } else {
            res.status(404).json({error: 'taste is not found'})
        }
    } catch(error){
        console.log("internal server error:", error )
    }
})



module.exports = router;