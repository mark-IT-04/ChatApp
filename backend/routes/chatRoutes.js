import express from 'express'
import { 
    accessChat,
    fetchChats,
    createGroupChat,
    addToGroup,
    removeFromGroup,
    renameGroup
} from '../controllers/chatController.js'
import { protect } from '../middleware/authMiddleware.js'

const router =express.Router()

router.route('/')
    .post(protect,accessChat)
    .get(protect,fetchChats)

router.route('/creategroup').post(protect,createGroupChat)
router.route('/renamegroup').put(protect,renameGroup)
router.route('/removefromgroup').put(protect,removeFromGroup)
router.route('/addtogroup').put(protect,addToGroup)


export default router