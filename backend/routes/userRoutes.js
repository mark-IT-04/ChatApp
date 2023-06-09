
import express from 'express'
import { 
    authUser,
    registerUser,
    getUsers,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router =express.Router()

router.get('/',protect,getUsers)
router.post('/register',registerUser)
router.post('/login',authUser)

export default router