const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const BookRouter = require("./routes/bookRoute");

const app = express();

dotenv.config();

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/books", BookRouter);


app.listen(8800, () => {
    console.log("Backend server is running!");
});