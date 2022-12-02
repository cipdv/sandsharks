import express from "express"
//controllers
import { getPosts, submitPost } from "../controllers/postControllers.js"
//middleware
import { protect, admin } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route('/').post(protect, admin, submitPost).get(protect, getPosts)


export default router