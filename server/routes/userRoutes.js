import express from "express"

//controllers
import { registerUser, loginUser, updateProfile } from "../controllers/userControllers.js"

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/updateprofile/:id').put(updateProfile)

export default router