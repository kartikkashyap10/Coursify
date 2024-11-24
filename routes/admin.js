const { Router } = require("express");
const { AdminModel, CourseModel } = require("../db.js");
const { z } = require("zod");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { authenticateAdminJwt } = require("../middlewares/admin.js");

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
        if (!success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid input"
            });
            return;
        }

        const { email, password, firstName, lastName } = data;

        const adminExists = AdminModel.findOne({
            email: email
        });

        if (adminExists) {
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
    } catch (e) {
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

        if (!success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid input"
            });
            return;
        }

        const { email, password } = data;

        const admin = AdminModel.findOne({
            email: email
        });

        if (!admin) {
            res.status(StatusCodes.BAD_REQUEST).json({
                messsage: "Kindly signup"
            });
            return;
        }

        const passwordCheck = bcrypt.compare(password, admin.password);
        if (!passwordCheck) {
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
    } catch (e) {
        console.error(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
});

adminRouter.use(authenticateAdminJwt);
adminRouter.post("/course", async (req, res) => {
    try {
        // Input validation
        const courseBody = z.object({
            tite: z.string().min(5).max(100),
            description: z.string().min(5).max(200),
            price: z.number(),
            imageUrl: z.string(),
        });

        const { success, data } = courseBody.safeParse(req.body);
        if (!success) {
            res.status(StatusCodes).json({
                message: "Invalid input"
            });
            return;
        }
        const { title, description, price, imageUrl } = data;
        creatorId = req.id;

        const course = await CourseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: creatorId
        });

        res.status(StatusCodes.OK).json({
            message: "Successful",
            courseId: course._id
        });
    } catch (e) {
        console.error(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
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