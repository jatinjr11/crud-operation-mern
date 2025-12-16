const express = require('express');
const router = express.Router();

router.post('/person', async (req, res) => {
    try {
        const data = req.body; // assuming the request body contains the person data

        // creating a new Person document using the mongoose model 
        const newPerson = new Person(data);

        // save the new person to the database
        const response = await newPerson.save();
        console.log('data saved:');
        res.status(299).json(response);

        /*
        newPerson.name = data.name; 
        newPerson.age = data.age;
        newPerson.address = data.address;
        newPerson.email = data.email;
        newPerson.mobile = data.mobile;
        */
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to get the person
router.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched:", data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", message: error });
    }
})
