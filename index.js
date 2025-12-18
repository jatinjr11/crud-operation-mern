const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes')


app.use(bodyParser.json());

db();
const PORT = 8000;

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes)

app.get('/', (req, res) => {
    res.send("hello jiii")
});





app.listen(8000, () => {
    console.log(`Server is running on ${PORT}`);
})