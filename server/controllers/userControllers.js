import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js'
import {registrationValidation} from '../utils/validate.js'

//desc: register a new user and get jwt
//route: POST /api/users/register
//access: public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, preferredName, pronouns, email, vballExperience, password, wantsEmailNotifications, waiverAndCodeSignature } = req.body

    try {
       //validation
       const errs = await registrationValidation(req.body)

        if(Object.keys(errs).length !== 0) {
            return res.status(400).json({errs})
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
            wantsEmailNotifications,
            waiverAndCodeSignature
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
            gotItVballExperience: user.gotItVballExperience,
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
                gotItVballExperience: user.gotItVballExperience,
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

//desc: update a user profile
//route: PUT /api/users/updateprofile/:id
//access: private
const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.params.id
    
    try {
        //find the user and update it
        const user = await User.findByIdAndUpdate(userId, req.body, {new: true})
        if (user) {
            return res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                preferredName: user.preferredName,
                pronouns: user.pronouns,
                vballExperience: user.vballExperience,
                email: user.email,
                adminStatus: user.adminStatus,
                wantsEmailNotifications: user.wantsEmailNotifications,
                gotItVballExperience: user.gotItVballExperience,
                token: generateToken(user._id)
            })
        } else {
            return res.status(400).json({message: 'Profile was not found'})
        }
    } catch (error) {
        console.log(error)
    }

})

//desc: user deletes their own profile
//route: DELETE /api/users/deleteprofile
//access: private
const deleteProfile = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const userId = req.params.id
    
    try {
        //find the user
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({message: 'Profile not found'})
        }
        //check if email matches
        if (user && user.email !== email) {
            return res.status(400).json({message: 'Incorrect email, check email spelling'})
        }
        //if password matches delete the user
        if(user && (await user.matchPassword(password))) {
            user.remove()
            res.status(201).json({message: 'Profile deleted'})
        } else {
            return res.status(400).json({message: 'Password is incorrect'})
        }
    } catch (error) {
        console.log(error)
    }
})


export { registerUser, loginUser, updateProfile, deleteProfile }