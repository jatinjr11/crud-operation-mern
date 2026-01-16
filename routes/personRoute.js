const express = require('express');
const Person = require('../models/Person');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const data = req.body; // assuming the request body contains the person data

        // creating a new Person document using the mongoose model 
        const newPerson = new Person(data);

        // save the new person to the database
        const response = await newPerson.save();
        console.log('data saved:');

        res.status(299).json({ response: response });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        // Extract username & password from request body
        const { username, password } = req.body;

        // find the user by username
        const user = await Person.findOne({ username: username });

        // if user does not exist or passowrd does not match, return error
        /*
        if(!user || user.password !== password){
            return res.status(401).json({error: 'Invalid username or password'});
        }
        */
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or passowrd" });
        }

        

        // return token as response
        res.json({ token: token });
    } catch (err) {
        console.log("login error", err);
    }
})

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

/*
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
*/

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

router.get('/profile', async (req, res) => {
    try {
        const userData = req.user;
        console.log("User data: ", userData);

        const user = await Person.findById(userData.id);

        res.status(200).json({ user });
    } catch (err) {
        console.log("profile error: ", err);
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router;
