const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const usersRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const followRoute = require("./routes/follow");
const postRoute = require("./routes/posts");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

dotenv.config();



mongoose.connect(
    process.env.MONGODB_URI
)
.then( () => console.log("MongoDB Database connected!!"))
.catch(err => console.log("Database connection failed: " + err));



app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/follow", followRoute);
app.use("/api/posts", postRoute);

const port = 6000;

app.listen(process.env.PORT || port , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
