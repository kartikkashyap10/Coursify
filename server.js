const express = require("express");
const app = express();
const port = 3000;

createUserRoutes = require("./user.js");

createUserRoutes(app);

app.post("/course/purchase", () => {
    res.json({
        message: "Signin endpoint"
    });
});

app.get("/course/preview", () => {
    res.json({
        message: "Signin endpoint"
    });
});

app.listen(port, () => {
    console.log(`server up on port ${port}`);
}); 
