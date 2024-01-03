import { User } from "../models/user.js";
import pkg from 'jsonwebtoken';
const { Jwt } = pkg;

export const isAuthenticated = async (req,res,next)=>{

    const {token} = req.cookies;

    if(!token) 
        return res.status(404).json({
            success: false,
            message: "Login First",
        });  
    

    const decoded = pkg.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    next();
};