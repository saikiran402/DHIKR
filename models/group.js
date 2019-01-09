const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"

        },
        username: String
    },
    createdAt: { type: Date, default: Date.now },
    email: String,
    groupid: String,
    name:String,
    type: String,
    count_array: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique:true
        },
        count:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Count"
        },
        createdAt: { type: Date, default: Date.now }

    }],
    goal: Number,
    goalreached: Date,
    sets: Number
});

module.exports = mongoose.model("Group", groupSchema);