const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const dotenv = require("dotenv");
dotenv.config();

const ObjectId = Schema.ObjectId;

// Schemas
const User = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const Admin = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: ObjectId, refers: Admin._id}
});

const Purchase = new Schema({
    courseId: {type: ObjectId, refers: Course._id},
    userId: { type: ObjectId, refers: User._id}
});

// models (collections)
const user = model("user", User);
const admin = model("admin", Admin);
const course = model("course", Course);
const purchase = model("purchase", Purchase);

module.exports = {
    user,
    admin,
    course,
    purchase
}