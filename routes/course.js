// const express = require("express");
// const Router  = express.Router;

const { Router } = require("express");
const courseRouter = Router();


courseRouter.post("/purchases", () => {
    res.json({
        message: "Signin endpoint"
    });
});

courseRouter.get("/preview", () => {
    res.json({
        message: "Signin endpoint"
    });
});

module.exports = {
    courseRouter: courseRouter
}