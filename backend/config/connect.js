const mongoose = require('mongoose');

const  connectDb = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("db connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/resumebuilder`);

}
module.exports={
    connectDb
}

