const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

function authenticateUserJwt(req, res, next) {
    const token = req.headers.authorization;

    if(!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Authentication token missing"
        });
        return;
    }

    const USER_JWT_PASSWORD = process.env.USER_JWT_PASSWORD;
    const decoded = jwt.verify(token, USER_JWT_PASSWORD);
    if(decoded) {
        req.id = decoded.id;
        next();
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            message: "Kindly sigin"
        });
    }
}

module.exports = {
    authenticateUserJwt: authenticateUserJwt
}