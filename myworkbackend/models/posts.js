const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
        userId:{type: String, required: true},
        title:{type: String, required: true},
        description:{type: String, required: true},
        username:{type: String, required: true},
        email:{type: String, required: true},
        likes:{type: Array}
},{timestamps: true});

module.exports = mongoose.model("posts" , postSchema);