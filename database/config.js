const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error trying connect to DB')
    }
}

module.exports = dbConnection

