const express = require("express");
const { connectToDatabase } = require("./db.js");
const dotenv = require("dotenv");
dotenv.config();


const { userRouter } = require("./routes/user.js");
const { courseRouter } = require("./routes/course.js");
const { adminRouter } = require("./routes/admin.js");

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

connectToDatabase().then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`server up on port ${port}`);
    });
});

