//dependencies
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//models
import User from '../models/user.js'

//configs
dotenv.config()

//register a new user
export const registerNewUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, confirmPassword, pronouns, profilePhoto, waiverSignature } = req.body
        const jwtSecret = process.env.JWT_SECRET
        //check if email is already registered
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.json({message: 'email already registered'})
        }
        //check if passwords match
        if (password !== confirmPassword) {
            return res.json({message: 'passwords do not match'})
        }
        //if passwords match, hash password
        const hashPassword = await bcrypt.hash(password, 12)
        //create user model
        const newUser = await User.create({firstName, lastName, email, phoneNumber, password: hashPassword, pronouns, profilePhoto, waiverSignature})
        //assign jwt
        const token = jwt.sign({id: newUser._id, email: newUser.email}, jwtSecret, {expiresIn: '1h'})
        //return the new user with their token
        res.status(200).json({newUser, token, message: 'registration successful'})
    } catch (error) {
        res.status(500).json({ message: 'there was a problem registering this user'})
        console.log(error)
    }
}
