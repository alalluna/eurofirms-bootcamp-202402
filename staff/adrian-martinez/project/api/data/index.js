import mongoose from "mongoose"

const { Schema, model } = mongoose;
const { Types: { ObjectId }} = Schema;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    surnames: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["student","company"]
    },
    age: {
        type: Number,
    },
    address: {
        type: String,
    },
    activity: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const career = new Schema ({
    student: {
      type: ObjectId,
      required: true,
      ref: "User" //Campo que vincula los post de un usuario
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    certification: {
      type: String,
      required: true,
    }
})

const subject = new Schema ({
    career: {
      type: ObjectId,
      required: true,
      ref: "Career" //Campo que vincula los post de un usuario
    },
    title: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: false
    },
    comment: {
      type: String,
      required: false
    }
})

const offer = new Schema ({
    company: {
      type: ObjectId,
      required: true,
      ref: "User" //Campo que vincula los post de un usuario
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    minSalary: {
      type: Number,
      required: true
    },
    maxSalary: {
        type: Number,
        required: false
    },
    publishDate: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
        required: false
    },
    candidates: [
      {
        type: ObjectId,
        ref: "User"
      }
    ]
})

const User = model("User", user);
const Career = model("Career", career);
const Subject = model("Subject", subject);
const Offer = model("Offer", offer);

//Bucket
export {
    User,
    Career,
    Subject,
    Offer
}