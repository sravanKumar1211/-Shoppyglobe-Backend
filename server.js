import express from 'express'
import mongoose from 'mongoose'
const app=express();

// sravankumargaddamedhi_db_user
// Aa6ZknDHD4DEksNe
mongoose.connect('mongodb+srv://sravankumargaddamedhi_db_user:Aa6ZknDHD4DEksNe@cluster0.diwezny.mongodb.net/')
.then(function(){console.log("DB Connected")})
.catch(function(){console.log("Err in DB connection")});

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Welcome to shop")
})











const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on PORT:${PORT}`)
})

