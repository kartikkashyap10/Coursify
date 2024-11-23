const { Router } = require("express");
const { admin } = require("../db.js");

const adminRouter = Router();
adminRouter.post("/signup", (req, res) => {
    res.send({
        message: "Admin signup endpoint"
    });
});

adminRouter.post("/signin", (req, res) => {
    res.send({
        message: "Admin signin endpoint"
    });
});

adminRouter.post("/course", (req, res) => {
    res.send({
        message: "Admin create course endpoint"
    });
});

adminRouter.put("/course", (req, res) => {
    res.send({
        message: "Admin edit course endpoint"
    });
});

adminRouter.get("/course/bulk", (req, res) => {
    res.send({
        message: "Admin get courses created endpoint"
    });
});

module.exports = {
    adminRouter
}