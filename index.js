// 39
const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes');
const passport = require('./auth');
require('dotenv').config();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json()); // req.body 
db();

// middleware functions
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);

app.use(passport.initialize());


const localAuthMiddleware = passport.authenticate('local', {session: false}) ;

app.get('/', localAuthMiddleware ,(req, res) => {
    res.send("hello jiii")
});
 
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})