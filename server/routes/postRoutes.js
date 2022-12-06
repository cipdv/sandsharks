import express from "express"
//controllers
import { getPosts, submitPost, replyToPost } from "../controllers/postControllers.js"
//middleware
import { protect, admin } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route('/').post(protect, admin, submitPost).get(protect, getPosts)
router.route('/reply/:id').put(protect, replyToPost)

export default router