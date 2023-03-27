import Veterinary from "../models/Veterinary.js";
import generateID from '../helpers/generateId.js';
import generateJSW from "../helpers/generateJWT.js";
import emailRegister from "../helpers/emailRegister.js";
import emailForgetPass from "../helpers/emailForgetPass.js";

export const register = async (req, res)=>{
    const {email, name} = req.body;
    const token = generateID();
    const userExists = await Veterinary.findOne({email});
    if(userExists){
        console.log('User exists')
        const error  = new Error('The user already exists');
        return res.status(400).json({msg: error.message});
    }

    try {
        const veterinary = new Veterinary({...req.body, token});
        const saveVeterinary = await veterinary.save();        
        //send the email to user
        emailRegister({
            email, name, token: saveVeterinary.token
        });

        res.json(saveVeterinary);
    } catch (error) {
        console.log(error)        
    }

};

export const perfil = (req, res)=>{
    const {veterinary} = req;
    res.json({veterinary});
}

export const updateProfile =async(req, res)=>{
    const veterinary = await Veterinary.findById(req.params.id);
    if(!veterinary){
        const error = new Error("Happend a error");
        return res.status(400).json({msg:error.message});
    }

    const {email} = req.body;

    if(veterinary.email !== req.body.email){
        const existsEmail = await Veterinary.findOne({email});
        if(existsEmail){
            const error = new Error("This email already is used");
            return res.status(400).json({msg:error.message});
        }
    }
    try {
        veterinary.name = req.body.name || veterinary.name;
        veterinary.email = req.body.email || veterinary.email;
        veterinary.phone = req.body.phone|| veterinary.phone;
        veterinary.web = req.body.web || veterinary.web;

        const veterinaryUpdate = await veterinary.save();
        res.json({veterinary:veterinaryUpdate});

    } catch (error) {
        console.log(error);
    }
}

export const confirm = async (req, res)=>{
    const {token} = req.params;

    const userToConfirm = await Veterinary.findOne({token});

    if(!userToConfirm){
        const error = new Error('Token invalid');
        return res.status(400).json({msg:error.message})
    }

    try {
        userToConfirm.token = null;
        userToConfirm.confirm = true;
        await userToConfirm.save();
        
        res.json({msg:'User confirm'})
    } catch (error) {
        console.log(error);
    }

}

export const auth = async (req, res)=>{
    const {email, password} = req.body;

    const user = await Veterinary.findOne({email});
    if(!user){
        const error = new Error('THE USER DONT EXISTS');
        return res.status(403).json({msg:error.message});
    }

    if(!user.confirm){
        const error = new Error('Your account dont be confirm');
        return res.status(403).json({msg:error.message});
    }

    const passwordConfirm = await user.checkPassword(password);

    if(!passwordConfirm){
        const error = new Error('Your password is incorrect');
        return res.status(403).json({msg:error.message});
    }
    user.token = generateJSW(user.id);

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: user.token
    });
}

export const forgetPassword= async (req,res) =>{
    const {email} = req.body;

    const existsVeterinary = await Veterinary.findOne({email});
    
    if(!existsVeterinary){
        const error = new Error("The user don't exists");
        return res.status(400).json({msg: error.message});
    }

    try {
        existsVeterinary.token = generateID();
        await existsVeterinary.save();

        emailForgetPass({email, name: existsVeterinary.name, token: existsVeterinary.token })

        res.json({msg: 'We send a message to email with instructions'});
    } catch (error) {
        return res.status(400).json({msg: error.message});
    
    }

}

export const checkToken= async (req,res) =>{
    const {token} = req.params;
    const isValidToken = await Veterinary.findOne({token});

    if(!isValidToken){
        const error = new Error("The token is invalid");
        return res.status(400).json({msg: error.message});
    }

   res.json({msg:"Token valid, the user exists"});
}

export const newPassword= async (req,res) =>{
    const {token} = req.params;
    const {password} = req.body;

    const veterinary = await Veterinary.findOne({token});

    if(!veterinary){
        const error = new Error("Happend a error");
        return res.status(400).json({msg: error.message});
    }

    try {
        veterinary.token = null;
        veterinary.password = password;
        await veterinary.save();
        res.json({msg: 'The password have been change'})
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
}

export const updatePassword= async(req, res)=>{
    const {id} = req.veterinary;
    const {password, newPassword} = req.body;

    const veterinary = await Veterinary.findById(id);

    if(!veterinary){
        const error = new Error("Happend a error");
        return res.status(400).json({msg: error.message});
    }

    if(await veterinary.checkPassword(password)){
        veterinary.password = newPassword;
        await veterinary.save();
        res.json({msg: 'The password has been change correctly'})
    }else{
        const error = new Error("The actual password is wrong");
        return res.status(400).json({msg: error.message});

    }
};