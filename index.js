const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const passport = require("./auth");

app.use(bodyParser.json());
db();

// middleware functions
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // move on to the next phase
}
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false}) ; 

app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menu', menuItemRoutes)


app.get('/',localAuthMiddleware , (req, res) => {
    res.send("hello jiii")
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})