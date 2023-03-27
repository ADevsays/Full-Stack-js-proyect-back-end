import jwt from 'jsonwebtoken';

export default function generateJSW(userId){
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    });
}