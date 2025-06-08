import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}
})

//hash password
const saltRounds=parseInt(process.env.SALT_ROUNDS);
userSchema.pre('save',async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, saltRounds);
    next()
})

//compare password
userSchema.methods.comparePassword=async function (userPassword) {
    return await bcrypt.compare(userPassword,this.password);
}

const User=mongoose.model('user',userSchema)
export default User;