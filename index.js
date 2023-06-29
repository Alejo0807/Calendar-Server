const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors')
require('dotenv').config();

const app = express();

//Public directory
app.use(express.static('public'));

//Parse body
app.use(express.json());

dbConnection();

//CORS
app.use(cors())

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Port
app.listen(process.env.PORT, () => {
    console.log('Server on port 3000')
});


