import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const hashPassword =  (password) =>{
    return  bcrypt.hashSync(password, 8);
}

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '3h'});
}


export const decode = (token) => {
       return jwt.verify(token, process.env.SECRET);
}
