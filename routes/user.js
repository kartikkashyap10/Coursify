const { Router } = require("express");
const { UserModel } = require("../db.js");
const { z } = require("zod");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");    

const dotenv = require("dotenv");
dotenv.config();

const userRouter = Router();
userRouter.post("/signup", async (req, res) => {
    try {
        // input validation
        const userBody = z.object({
            email: z.string().email(),
            password: z.string().min(5).max(10),
            firstName: z.string().min(5).max(10),
            lastName: z.string().min(5).max(10)
        });

        const { success, data } = userBody.safeParse(req.body);

        if (!success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid input!"
            });
            return;
        }
        const { email, password, firstName, lastName } = data;

        const userExists = await UserModel.findOne({
            email: email
        });

        if (userExists) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already exists"
            });
            return;
        }

        //password hashing
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        res.status(StatusCodes.OK).json({
            message: "Succesfully signed up.",
        });

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    };
});

userRouter.post("/signin", async (req, res) => {
    try {
        // input validation
        const userBody = z.object({
            email: z.string().email(),
            password: z.string().min(5).max(100)
        });

        const { success, data } = userBody.safeParse(req.body);
        if (!success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid input"
            });
            return;
        }

        const { email, password } = data;

        const user = await UserModel.findOne({
            email: email
        });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Kindly signup"
            });
            return;
        }

        const passwordCheck = bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            res.status(StatusCodes.FORBIDDEN).json({
                message: "Invalid password"
            });
            return;
        }

        // JWT token generation
        const USER_JWT_PASSWORD = process.env.USER_JWT_PASSWORD;
        const authToken = jwt.sign({
            id: user._id.toString()
        }, USER_JWT_PASSWORD);
        
        // Todo: Cookie logic
        res.status(StatusCodes.OK).json({
            token: authToken
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
});

userRouter.get("UserModel/purchases", () => {
    res.json({
        message: "Signin endpoint"
    });
});

module.exports = {
    userRouter: userRouter
}