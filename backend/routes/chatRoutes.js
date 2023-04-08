import express from 'express'
import { 
    accessChat,
    fetchChats,
    createGroupChat,
    updateGroup,
} from '../controllers/chatController.js'
import { protect } from '../middleware/authMiddleware.js'

const router =express.Router()

router.route('/')
    .post(protect,accessChat)
    .get(protect,fetchChats)

router.route('/creategroup').post(protect,createGroupChat)
router.route('/updategroup').put(protect,updateGroup)
// router.route('/removefromgroup').put(protect,removeFromGroup)



export default router