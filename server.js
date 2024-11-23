const express = require("express");
const app = express();
const port = 3000;

const { userRouter } = require("./routes/user.js");
const { courseRouter } = require("./routes/course.js");

app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(port, () => {
    console.log(`server up on port ${port}`);
}); 
