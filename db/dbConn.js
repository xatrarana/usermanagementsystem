const mongoose = require('mongoose');


const dbConn = async () => {
    mongoose.set('strictQuery', false);
    return mongoose.connect('mongodb://localhost:27017');
}

module.exports = dbConn;
