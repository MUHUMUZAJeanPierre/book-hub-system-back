// const express = require("express");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
// const connectDB = require("./config/db");
// const BookRouter = require("./routes/bookRoute");
// const bodyParser = require("body-parser");

// const app = express();

// dotenv.config();

// app.use(express.json());
// app.use(bodyParser.json());


// connectDB();

// app.use("/", userRoutes);
// app.use("/", router);


// app.listen(process.env.PORT , () => {
//     console.log("Backend server is running!");
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookRouter = require("./routes/bookRoute");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB();
// Routes
app.use("/book", bookRouter);
app.use("/", userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
