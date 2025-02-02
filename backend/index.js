const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
require('dotenv').config();
const { connectDb } = require('./config/connect');
const cookieParser = require('cookie-parser');
const isAuth = require('./middlewares/isAuth');
const allowedOrigins = ['http://localhost:5173'];

const app = express();
app.use(cookieParser());

const PORT=8000;
app.use(express.json());
connectDb();

// cors
app.use(cors({
    origin: '*', // Allow only specific origins
    credentials: false, // Allow cookies and other credentials
}));

app.get("/",isAuth,(req,res)=>{
    return res.end("works");
})
app.use("/api/user",userRoutes);




app.listen(PORT,(req,res)=>{
  
    console.log("started");
});
