import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js'

//desc: register a new user and get jwt
//route: POST /api/users/register
//access: public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, preferredName, pronouns, email, vballExperience, password, confirmPassword, wantsEmailNotifications, waiverAndCodeSignature } = req.body

    try {
       //validation
        const userExists = await User.findOne({email})
        if(userExists) {
            return res.status(400).json({
                message: `User already exists`
            })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                message: `Passwords do not match`
            })
        }

        if(!firstName) {
            return res.status(400).json({
                message: 'First name is required'
            })
        }

        if(!lastName) {
            return res.status(400).json({
                message: 'Last name is required'
            })
        }

        if(!pronouns) {
            return res.status(400).json({
                message: 'Pronouns are required'
            })
        }

        if(!email) {
            return res.status(400).json({
                message: 'Email is required'
            })
        }

        if(!password) {
            return res.status(400).json({
                message: 'Password is required'
            })
        }

        if(!vballExperience) {
            return res.status(400).json({
                message: 'Please select your volleyball experience'
            })
        }

        if(!waiverAndCodeSignature) {
            return res.status(400).json({
                message: 'You must agree to the waiver and code of conduct to become a member'
            })
        }


        //proceed with registering user
        const user = await User.create({
            firstName,
            lastName,
            preferredName: preferredName ? preferredName : firstName,
            pronouns,
            email,
            vballExperience,
            password,
            wantsEmailNotifications
        })

        //return user 
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            preferredName: user.preferredName,
            pronouns: user.pronouns,
            vballExperience: user.vballExperience,
            email: user.email,
            adminStatus: user.adminStatus,
            wantsEmailNotifications: user.wantsEmailNotifications,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.log(error)
    }
})

//desc: login a user and get jwt
//route: POST /api/users/login
//access: public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user) {
            return res.status(401).json({message: 'User does not exist'})
        }

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                preferredName: user.preferredName,
                pronouns: user.pronouns,
                vballExperience: user.vballExperience,
                email: user.email,
                adminStatus: user.adminStatus,
                wantsEmailNotifications: user.wantsEmailNotifications,
                token: generateToken(user._id)
            })
        } else {
            return res.status(401).json({
                message: 'Password is incorrect'
            })
        }
    } catch (error) {
        console.log(error)
    }
    
})

export { registerUser, loginUser }