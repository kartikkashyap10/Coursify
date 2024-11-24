const { Router } = require("express");
const { AdminModel } = require("../db.js");
const { z } = require("zod"); 
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
const user = require("./user.js");
dotenv.config();


const adminRouter = Router();
adminRouter.post("/signup", async (req, res) => {
    try {
        // Input validation
        const adminBody = z.object({
            email: z.string().email(),
            password: z.string().min(5).max(20),
            firstName: z.string().min(5).max(10),
            lastName: z.string().min(5).max(10)
        });

        const { success, data } = adminBody.safeParse(req.body);
        if(!success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid input"
            });
            return;
        }

        const { email, password, firstName, lastName } = data;

        const adminExists = AdminModel.findOne({
            email: email
        });

        if(adminExists) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already exists"
            });
            return;
        }

        // passsword hashing
        const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
        const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);

        await AdminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        res.status(StatusCodes.OK).json({
            message: "Successful"
        });
    } catch(e) {
        console.error(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
});

adminRouter.post("/signin", (req, res) => {
    try {
        // Input Validation
        const adminBody = z.object({
            email: z.string().email(),
            password: z.string().min(5).max(10)
        });

        const { success, data } = z.safeParse(req.body);

        if(!success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid input"
            });
            return;
        }

        const admin = AdminModel.findOne({
            email: email
        });

        if(!admin) {
            res.status(StatusCodes.BAD_REQUEST).json({
                messsage: "Kindly signup"
            });
            return;
        }

        const passwordCheck = bcrypt.compare(password, admin.password);
        if(!passwordCheck) {
            res.status(StatusCodes.FORBIDDEN).json({
                message: "Invalid credentials"
            });
        }

        // JWT
        const ADMIN_JWT_PASSWORD = process.env.ADMIN_JWT_PASSWORD;
        const authToken = JsonWebTokenError.sign({
            id: admin._id.toString()
        }, ADMIN_JWT_PASSWORD);

        res.statusCode(StatusCodes.OK).json({
            token: authToken
        });
    } catch(e) {
        console.error(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
});

adminRouter.post("/", (req, res) => {
    res.send({
        message: "Admin create course endpoint"
    });
});

adminRouter.put("/", (req, res) => {
    res.send({
        message: "Admin edit course endpoint"
    });
});

adminRouter.get("/bulk", (req, res) => {
    res.send({
        message: "Admin get courses created endpoint"
    });
});

module.exports = {
    adminRouter
}