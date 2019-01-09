const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
    type:String,
    count:Number,
    author:String
});

module.exports = mongoose.model("Count", countSchema);