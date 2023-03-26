import { 
    ACCESS_CHAT_FAIL,
    ACCESS_CHAT_REQUEST, 
    ACCESS_CHAT_RESET, 
    ACCESS_CHAT_SUCCESS, 
    ADDTO_GROUP_FAIL, 
    ADDTO_GROUP_REQUEST, 
    ADDTO_GROUP_RESET, 
    ADDTO_GROUP_SUCCESS, 
    CREATE_GROUP_FAIL, 
    CREATE_GROUP_REQUEST, 
    CREATE_GROUP_RESET, 
    CREATE_GROUP_SUCCESS, 
    FETCH_CHAT_FAIL, 
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_RESET,
    FETCH_CHAT_SUCCESS,
    REMOVEFROM_GROUP_FAIL,
    REMOVEFROM_GROUP_REQUEST,
    REMOVEFROM_GROUP_RESET,
    REMOVEFROM_GROUP_SUCCESS,
    RENAME_GROUP_FAIL,
    RENAME_GROUP_REQUEST,
    RENAME_GROUP_RESET,
    RENAME_GROUP_SUCCESS
} from "../_constants/chatConstants"

export const chatAccessReducer = (state={chats:[]},action)=>{
    switch(action.type){
        case ACCESS_CHAT_REQUEST:
            return {loading:true}
        case ACCESS_CHAT_SUCCESS:
            return {loading:false,chats: action.payload}
        case ACCESS_CHAT_FAIL:
            return {loading:false, error: action.payload}
        case ACCESS_CHAT_RESET:
            return {chats:[]}
        default:
            return state    
    }
}

export const chatFetchReducer = (state={chats:[]},action)=>{
    switch(action.type){
        case FETCH_CHAT_REQUEST:
            return {loading:true}
        case FETCH_CHAT_SUCCESS:
            return {loading:false,chats: action.payload}
        case FETCH_CHAT_FAIL:
            return {loading:false, error: action.payload}
        case FETCH_CHAT_RESET:
            return {chats:[]}
        default:
            return state    
    }
}

export const groupCreateReducer = (state={group:[]},action)=>{
    switch(action.type){
        case CREATE_GROUP_REQUEST:
            return {loading:true}
        case CREATE_GROUP_SUCCESS:
            return {loading:false,group: action.payload}
        case CREATE_GROUP_FAIL:
            return {loading:false, error: action.payload}
        case CREATE_GROUP_RESET:
            return {group:[]}
        default:
            return state    
    }
}

export const groupRenameReducer = (state={group:[]},action)=>{
    switch(action.type){
        case RENAME_GROUP_REQUEST:
            return {loading:true}
        case RENAME_GROUP_SUCCESS:
            return {loading:false,group: action.payload}
        case RENAME_GROUP_FAIL:
            return {loading:false, error: action.payload}
        case RENAME_GROUP_RESET:
            return {group:[]}
        default:
            return state    
    }
}

export const groupRemoveFromReducer = (state={group:[]},action)=>{
    switch(action.type){
        case REMOVEFROM_GROUP_REQUEST:
            return {loading:true}
        case REMOVEFROM_GROUP_SUCCESS:
            return {loading:false,group: action.payload}
        case REMOVEFROM_GROUP_FAIL:
            return {loading:false, error: action.payload}
        case REMOVEFROM_GROUP_RESET:
            return {group:[]}
        default:
            return state    
    }
}

export const groupAddToReducer = (state={group:[]},action)=>{
    switch(action.type){
        case ADDTO_GROUP_REQUEST:
            return {loading:true}
        case ADDTO_GROUP_SUCCESS:
            return {loading:false,group: action.payload}
        case ADDTO_GROUP_FAIL:
            return {loading:false, error: action.payload}
        case ADDTO_GROUP_RESET:
            return {group:[]}
        default:
            return state    
    }
}