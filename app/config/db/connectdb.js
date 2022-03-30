const mongoose = require('mongoose');
const config = require('../index');
async function connectDb() {
    try {
        await mongoose.connect(config.db.uri);
        console.log("Connect Succsessfully!");
    } catch (error) {
        console.log("Connect Failed!");
    }
}

module.exports = {connectDb}