import { 
    MESSAGES_ALL_FAIL, 
    MESSAGES_ALL_REQUEST, 
    MESSAGES_ALL_RESET, 
    MESSAGES_ALL_SUCCESS, 
    MESSAGES_SEND_REQUEST,
    MESSAGES_SEND_RESET,
    MESSAGES_SEND_SUCCESS
} from "../_constants/messageConstants"
import { USER_REGISTER_FAIL } from "../_constants/userConstants"


export const messagesAllReducer = (state={messages:[]},action)=>{
    switch(action.type){
        case MESSAGES_ALL_REQUEST:
            return {loading:true}
        case MESSAGES_ALL_SUCCESS:
            return {loading:false,success:true,messages: action.payload}
        case MESSAGES_ALL_FAIL:
            return {loading:false, error: action.payload}
        case MESSAGES_ALL_RESET:
            return {messages:[]}
        default:
            return state    
    }
}

export const messageSendReducer = (state={message:[]},action)=>{
    switch(action.type){
        case MESSAGES_SEND_REQUEST:
            return {loading:true}
        case MESSAGES_SEND_SUCCESS:
            return{loading:false, success:true, message: action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false, error: action.payload}
        case MESSAGES_SEND_RESET:
            return {message:[]}
        default:
            return state    
    }
}