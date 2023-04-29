const mongoose = require('mongoose');
const config = require('config');

mongoose.set('strictQuery', false);
module.exports = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'));
        console.log('Connected to database');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

