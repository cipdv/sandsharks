//dependencies
import express from 'express'

//controllers
import { registerNewUser } from '../controllers/users.js'

//configs
const router = express.Router()

//register a new user
router.post('/register', registerNewUser)

export default router