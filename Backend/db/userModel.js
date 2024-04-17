const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true,"please provide an Email"],
        unique: [true,"Email exists"],
    },
    password: {
        type: String,
        required:[true,"Please provide a password"],
        unique: false,
    },
});

// this means create a user table or collection if there is no table with that name already

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);