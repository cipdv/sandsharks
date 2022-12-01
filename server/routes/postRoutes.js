import express from "express"

//controllers
import { submitPost } from "../controllers/postControllers.js"

const router = express.Router()

router.route('/').post(submitPost)


export default router