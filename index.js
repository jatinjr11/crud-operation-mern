const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());

db();

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes)

app.get('/', (req, res) => {
    res.send("hello jiii")
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})