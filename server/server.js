const express = require("express");
const app = express();
const connectDB = require("./config/db");
// const path = require("path");

//connecting to database
connectDB();

//Initializing Middleware
app.use(express.json({ extended: false }));

// defining routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
