import React from 'react'
import axios from 'axios'
import { showNotification } from '@mantine/notifications';
import { TbCheck,TbX } from "react-icons/tb";
import { 
    ACCESS_CHAT_FAIL,
    ACCESS_CHAT_REQUEST,
    ACCESS_CHAT_SUCCESS, 
    CREATE_GROUP_FAIL, 
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS, 
    FETCH_CHAT_FAIL, 
    FETCH_CHAT_REQUEST,
    FETCH_CHAT_SUCCESS,
    REMOVEFROM_GROUP_FAIL,
    REMOVEFROM_GROUP_REQUEST,
    REMOVEFROM_GROUP_SUCCESS,
    RENAME_GROUP_FAIL,
    RENAME_GROUP_REQUEST,
    RENAME_GROUP_SUCCESS,
    UPDATE_GROUP_FAIL,
    UPDATE_GROUP_REQUEST,
    UPDATE_GROUP_SUCCESS
} from "../_constants/chatConstants"
const notifyMsg=(msg,mode)=>{
    showNotification({
        icon:mode==='success'?<TbCheck size={18} />:<TbX size={18}/>,
        color:mode==='success'?"teal":"red",
        title: mode==='success'?'Success':'Error',
        message: msg,
        radius: 'md' 
      })
}

export const accessChat = (userId) => async (dispatch,getState) =>{
    try {
        dispatch({
            type:ACCESS_CHAT_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{ 
                Authorization:`Bearer ${userInfo.token}`
            },            
        }

        const {data}=await axios.post('/chats',{userId},config)
       
        
        dispatch({
            type: ACCESS_CHAT_SUCCESS,
            payload: data
        })
        dispatch(fetchChat())
       
        
        
    } catch (error) {
        dispatch({
            type: ACCESS_CHAT_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const fetchChat = () => async (dispatch,getState) =>{
    try {
        dispatch({
            type:FETCH_CHAT_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{ 
                Authorization:`Bearer ${userInfo.token}`
            },            
        }

        const {data}=await axios.get('/chats',config)
        
        dispatch({
            type: FETCH_CHAT_SUCCESS,
            payload: data
        })
        
        
    } catch (error) {
        dispatch({
            type: FETCH_CHAT_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const createGroup = (name,users) => async (dispatch,getState) =>{
    try {
        dispatch({
            type:CREATE_GROUP_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{ 
                Authorization:`Bearer ${userInfo.token}`
            },            
        }

        const {data}=await axios.post('/chats/creategroup',{name,users},config)
        
        dispatch({
            type: CREATE_GROUP_SUCCESS,
            payload: data
        })
        notifyMsg('New Group Chat was succefully created!','success')
        dispatch(fetchChat())
        
    } catch (error) {
        dispatch({
            type: CREATE_GROUP_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateGroup = (chatId,chatName,chatUsers) => async (dispatch,getState) =>{
    try {
        dispatch({
            type:UPDATE_GROUP_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{ 
                Authorization:`Bearer ${userInfo.token}`
            },            
        }

        const {data}=await axios.put('/chats/updategroup',{chatId,chatName,chatUsers},config)
        
        dispatch({
            type: UPDATE_GROUP_SUCCESS,
            payload: data
        })
        notifyMsg('Group Chat was succefully updated!','success')
        dispatch(fetchChat())
        
    } catch (error) {
        dispatch({
            type: UPDATE_GROUP_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const removeFromGroup = (chatId,userId) => async (dispatch,getState) =>{
    try {
        dispatch({
            type:REMOVEFROM_GROUP_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{ 
                Authorization:`Bearer ${userInfo.token}`
            },            
        }

        const {data}=await axios.put('/chats/removefromgroup',(chatId,userId),config)
        
        dispatch({
            type: REMOVEFROM_GROUP_SUCCESS,
            payload: data
        })
        
        
    } catch (error) {
        dispatch({
            type: REMOVEFROM_GROUP_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

