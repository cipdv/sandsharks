import express from "express"

//controllers
import { registerUser, loginUser, updateProfile, deleteProfile, getAllUsers, adminUserUpdate, adminDeleteProfile, searchUsers } from "../controllers/userControllers.js"
//middleware
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/updateprofile/:id').put(protect, updateProfile)
router.route('/deleteprofile/:id').post(protect, deleteProfile)
router.route('/').get(protect, getAllUsers)
router.route('/admin/updateuserprofile/:id').put(protect, admin, adminUserUpdate)
router.route('/admin/deleteuserprofile/:id').delete(protect, admin, adminDeleteProfile)
router.route('/search').get(protect, admin, searchUsers)

export default router