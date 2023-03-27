import mongoose from "mongoose";
import bycrypt from 'bcrypt'; 

const veterinarySchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim:true
    }, 
    password: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        default:null,
        trim:true
    },
    web:{
        type:String,
        default:null
    },
    token:{
        type:String,
    },
    confirm:{
        type:Boolean,
        default:false
    }
});

veterinarySchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

veterinarySchema.methods.checkPassword= async function(formPassword){
    return await bycrypt.compare(formPassword, this.password);
}

const Veterinary = mongoose.model('Veterinary', veterinarySchema);

export default Veterinary;