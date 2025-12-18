const express = require('express');
const Person = require('../models/Person');
const router = express.Router();

router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched:", data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", message: error });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType });
            console.log("Response fetched: ", response);
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid work type" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Invalid server error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            res.status(404).json({ error: "Person not found" });
        }

        console.log("data updated", response);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            res.status(404).json({ error: "Person not found" });
        } else {
            console.log("data delete:", response);
            res.status(200).json({ message: "Person deleted successfully", data: response });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Invalid server error" });
    }
})

module.exports = router;
