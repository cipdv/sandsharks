import asyncHandler from 'express-async-handler'
import sgMail from '@sendgrid/mail'
import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js'
import {registrationValidation} from '../utils/validate.js'
import dotenv from 'dotenv'

//configs
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//desc: register a new user and get jwt
//route: POST /api/users/register
//access: public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, preferredName, pronouns, email, vballExperience, password, wantsEmailNotifications } = req.body
    let { image } = req.body

    try {
       //validation
       const errs = await registrationValidation(req.body)

        if(Object.keys(errs).length !== 0) {
            return res.status(400).json({errs})
        }

        //set image to Sandsharks logo if there is no image file uploaded
        if (image === "") {
            image = '/uploads\\SandSharks.jpg'
        }
        
        //proceed with registering user
        const user = await User.create({
            firstName,
            lastName,
            preferredName: preferredName ? preferredName : firstName,
            pronouns,
            email,
            image: {
                image: image,
                status: 'pending'
            },
            vballExperience,
            password,
            wantsEmailNotifications,
            waiverAndCoC: false
        })

        const msg = {
            to: 'cipdevries@ciprmt.com', // Change to your recipient
            from: 'cipdevries@ciprmt.com', // Change to your verified sender
            subject: `New Shark: ${firstName} "${preferredName}" ${lastName}`,
            text: `${firstName} ${lastName} has registered as a new user.`,
            html: `
              <p>${firstName} "${preferredName}" ${lastName} has registered as a new user.</p>
              <p>Pronouns: ${pronouns}</p>
              <p>Email: ${email}</p>
              <p>${vballExperience}</p>
            `,
          }
    
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
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
            image: user.image,
            adminStatus: user.adminStatus,
            wantsEmailNotifications: user.wantsEmailNotifications,
            gotItVballExperience: user.gotItVballExperience,
            waiverAndCoC: user.waiverAndCoC,
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
                waiverAndCoC: user.waiverAndCoC,
                wantsEmailNotifications: user.wantsEmailNotifications,
                gotItVballExperience: user.gotItVballExperience,
                token: generateToken(user._id),
                image: user.image
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
                image: user.image,
                pronouns: user.pronouns,
                vballExperience: user.vballExperience,
                email: user.email,
                adminStatus: user.adminStatus,
                waiverAndCoC: user.waiverAndCoC,
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

//desc: get all user profiles
//route: GET /api/users
//access: private
const getAllUsers = asyncHandler(async(req, res) => {
    try {
        const users = await User.find()
        if (users) {
            return res.status(201).json(users)
        } else {
            return res.status(400).json({message: 'Something went wrong, refresh page'})
        }
    } catch (error) {
        
    }
})

const adminUserUpdate = asyncHandler(async(req, res) => {
    const userId = req.params.id
    const { adminStatus, vballExperience, status } = req.body
    
    try {
        //find the user and update it
        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                "adminStatus": adminStatus,
                "vballExperience": vballExperience,
                "image.status": status, 
            }
        }, {new: true})
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(400).json({message: 'Profile was not found'})
        }
    } catch (error) {
        console.log(error)
    }
})

const adminDeleteProfile = asyncHandler(async(req,res) => {
    const userId = req.params.id

    try {
        await User.findByIdAndDelete(userId)
        return res.status(200).json({message: 'User was deleted'})
    } catch (error) {
        return res.status(400).json({message: 'User not deleted'})
    }
})

const searchUsers = asyncHandler(async(req, res) => {
    const { searchQuery } = req.query

    try {
        const name = new RegExp(searchQuery, 'i')
        const users = await User.find({ $or: [{firstName: name}, {lastName: name}, {email: name}, {vballExperience: name}, {adminStatus: name}] })
        
        if (users?.length === 0) {
          return res.status(401).json({message: 'No users found'})
        } else {
          return res.status(200).json(users)
        }
      } catch (error) {
        res.status(404).json(error.message)
      }
})

export { registerUser, loginUser, updateProfile, deleteProfile, getAllUsers, adminUserUpdate, adminDeleteProfile, searchUsers }