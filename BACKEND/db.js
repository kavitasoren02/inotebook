const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try{
        const db = await mongoose.connect(mongoURI);
        console.log("DB Connected")
    }
    catch(err){
        console.log("Error", err)
    }
};

module.exports = connectToMongo;
