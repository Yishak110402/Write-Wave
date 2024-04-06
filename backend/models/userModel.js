const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A user must have a name'],
    },
    email:{
        type: String,
        required:[true,'A user must have an email'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'A user must have a password'],
        min: 8
    }
})

// userSchema.pre('save',function(){
//     const hashedPassword = 
// })

const User = mongoose.model('User', userSchema)

module.exports = User