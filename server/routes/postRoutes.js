import express from "express"
//controllers
import { getPosts, submitPost, replyToPost, deletePost, updatePost, replyToClinic } from "../controllers/postControllers.js"
//middleware
import { protect, admin } from "../middleware/authMiddleware.js"


const router = express.Router()

router.route('/').post(protect, admin, submitPost).get(protect, getPosts)
router.route('/reply/:id').put(protect, replyToPost)
router.route('/:id').delete(protect, admin, deletePost).put(protect, admin, updatePost)
router.route('/replytoclinic/:id').put(protect, replyToClinic)

export default router