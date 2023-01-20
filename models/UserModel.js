const mongoose =  require('mongoose')


const userSchema = new mongoose.Schema({      
    name : {type : String, required : true},
    email : {type : String, required : true, match: /.+\@.+\..+/,
    unique: true},
    dob : {type : String, required : true},
    address : {type : String, required : true},
    country : {type : String, required : true}
})


const UserModel =  mongoose.model("user", userSchema)

module.exports = {UserModel}


