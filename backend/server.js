require("dotenv").config();

// express app
const express = require("express");
const wallB = express();

const errorHandler = require("./middleware/error");
// database connection
const connectDB = require("./config/db");
connectDB();

// parse json body
wallB.use(express.json());

// handling routes
wallB.use("/auth", require("./routes/auth"));
wallB.use("/demo", require("./routes/demoPrivate"));

// error handler middleware should be last (because "next" will go through all previous middleware)
wallB.use(errorHandler)

// listing on port
const PORT = process.env.PORT || 5000;
const server = wallB.listen(PORT, ()=>{
    console.log(`WallB's server is running on port ${PORT}`);
})

// handling any server error
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
})