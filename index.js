const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

app.use(bodyParser.json());

db();
const PORT = 8000;

app.get('/', (req, res) => {
    res.send("Ram")
});

// POST method to add a Menu Item
app.post('/menu', async (req, res) => {
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
app.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Menu item data fetched:", data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType });
            console.log("Response fetched: ", response);
            res.status(200).json(response);
        }else {
            res.status(404).json({error: "Invalid work type"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Invalid server error"});
    }
})

app.listen(8000, () => {
    console.log(`Server is running on ${PORT}`);
})