import express from "express"

//controllers
import { registerUser, loginUser, updateProfile } from "../controllers/userControllers.js"
//middleware
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/updateprofile/:id').put(protect, updateProfile)

export default router