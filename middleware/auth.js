import jwt from "jsonwebtoken";
import Veterinary from "../models/Veterinary.js";
export const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    let isToken;
    if(token && token.startsWith('Bearer')){
        try {
            isToken = token.split(' ')[1];
            const {id} = jwt.verify(isToken, process.env.JWT_SECRET);

            req.veterinary = await Veterinary.findById(id)
                                                .select('-password -token -confirm');
            return next();
        } catch (error) {
            const e = new Error('Token invalid');
            res.status(403).json({msg: e.message});
        }
    }

    if(!token){
        const error = new Error('Token invalid or inexistent');
        res.status(403).json({msg: error.message});
    }
    next();

}