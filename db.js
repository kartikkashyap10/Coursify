const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const dotenv = require("dotenv");
dotenv.config();

const ObjectId = Schema.ObjectId;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected");
    } catch(error) {
        console.error(error);
        console.log("Database Connection failed");
        process.exit(1);
    }
}

// Schemas
const UserSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const AdminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { 
        type: ObjectId, 
        refers: 'Admin',
        required: true
    }
});

const PurchaseSchema = new Schema({
    courseId: {
        type: ObjectId, 
        refers: 'Course', // Refers to the Course model
        required: true
    },
    userId: {
        type: ObjectId, 
        refers: 'User', // Refers to the User model
        required: true
    }
});

// models (collections)
const UserModel = model("user", UserSchema);
const AdminModel = model("admin", AdminSchema);
const CourseModel = model("course", CourseSchema);
const PurchaseMdodel = model("purchase", PurchaseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseMdodel,
    connectToDatabase
}