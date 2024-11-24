const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

function authenticateAdminJwt(req, res, next) {
    const token = req.headers.authorization;

    if(!token) {
        res.status(StatusCodes).json({
            message: "Authentication token missing"
        });
        return;
    }

    const ADMIN_JWT_PASSWORD = process.env.ADMIN_JWT_PASSWORD;
    const decoded = jwt.verify(token, ADMIN_JWT_PASSWORD);

    if(decoded) {
        req.id = decoded.id;
        next();
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            message: "Kindly sign in"
        });
    }
}   

module.exports = {
    authenticateAdminJwt: authenticateAdminJwt
}