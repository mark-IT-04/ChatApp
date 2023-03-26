import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    userLoginReducer,
    userListReducer,
    userRegisterReducer,
} from './_reducers/userReducers'

import {
    chatAccessReducer,
    chatFetchReducer,
    groupCreateReducer,
    groupRenameReducer,
    groupRemoveFromReducer,
    groupAddToReducer
} from './_reducers/chatReducers'

const reducer = combineReducers({
    userLogin:userLoginReducer,
    userList:userListReducer,
    userRegister:userRegisterReducer,
    chatAccess:chatAccessReducer,
    chatFetch:chatFetchReducer,
    groupCreate:groupCreateReducer,
    groupRename:groupRenameReducer,
    groupRemoveFrom:groupRemoveFromReducer,
    groupAddTo:groupAddToReducer
})


const userInfoFromStorage=localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null

const initialState={
    
    userLogin:{userInfo:userInfoFromStorage},  
}

const middleware=[thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store