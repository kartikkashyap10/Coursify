const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const { userRouter } = require("./routes/user.js");
const { courseRouter } = require("./routes/course.js");
const { adminRouter } = require("./routes/admin.js");

const app = express();

app.use("api/v1/user", userRouter);
app.use("api/v1/course", courseRouter);
app.use("api/v1/admin", adminRouter);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`server up on port ${port}`);
    }); 
}

main();

