const express= require("express");
const app=express();
require("dotenv").config();
require("./Connection/connection");
const User = require("./routes/user");
// const Book = require("./routes/book");

app.use(express.json());
// routes
app.use("/api/v1", User);
// app.use("/api/v1", Book);

app.listen(process.env.PORT,()=>{
    console.log(`Server started at port${process.env.PORT}`);
});

