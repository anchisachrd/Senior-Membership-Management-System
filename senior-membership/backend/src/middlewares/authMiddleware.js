import jwt from "jsonwebtoken";
import dotenv from 'dotenv';



dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

export const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: "Access Denied: No Token Provided" });
    }
    
    try {
        const verified = jwt.verify(String(token), JWT_SECRET);
        req.user = verified.userInfo;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};


