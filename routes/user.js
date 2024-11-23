const { Router } = require("express");
const { user } = require("../db.js");

const userRouter = Router();
userRouter.post("/user/signup", () => {
    res.json({
        message: "Signup endpoint"
    });
});

userRouter.post("/user/signin", () => {
    res.json({
        message: "Signin endpoint"
    });
});

userRouter.get("user/purchases", () => {
    res.json({
        message: "Signin endpoint"
    });
});

module.exports = {
    userRouter: userRouter
}