const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max:200,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 4,
    },
    isAvatarImageSet : {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
});


module.exports = mongoose.model("Users", userSchema);