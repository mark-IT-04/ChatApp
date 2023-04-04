import React from 'react'
import axios from 'axios'
import { showNotification } from '@mantine/notifications';
import { TbCheck,TbX } from "react-icons/tb";
import { MESSAGES_ALL_FAIL, MESSAGES_ALL_REQUEST, MESSAGES_ALL_SUCCESS, MESSAGES_SEND_FAIL, MESSAGES_SEND_REQUEST, MESSAGES_SEND_SUCCESS } from '../_constants/messageConstants';
const notifyMsg=(msg,mode)=>{
    showNotification({
        icon:mode==='success'?<TbCheck size={18} />:<TbX size={18}/>,
        color:mode==='success'?"teal":"red",
        title: mode==='success'?'Success':'Error',
        message: msg,
        radius: 'md' 
      })
}



export const allMessages = (chatId) => async (dispatch,getState) =>{
    try {
        dispatch({
            type:MESSAGES_ALL_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{ 
                Authorization:`Bearer ${userInfo.token}`
            },            
        }

        const {data}=await axios.get(`/message/${chatId}`,config)
        
        dispatch({
            type: MESSAGES_ALL_SUCCESS,
            payload: data
        })
        
        
    } catch (error) {
        dispatch({
            type:MESSAGES_ALL_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const sendMessage = (content,chatId) => async (dispatch,getState) =>{
    console.log(content,chatId)
    try {
        dispatch({
            type:MESSAGES_SEND_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{ 
                Authorization:`Bearer ${userInfo.token}`
            },            
        }

        const {data}=await axios.post('/message',{content,chatId},config)

        dispatch({
            type: MESSAGES_SEND_SUCCESS,
            payload: data
        })
        //   notifyMsg('Your account was successfully registred!','success')

    } catch (error) {
        dispatch({
            type: MESSAGES_SEND_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
       
    }
    
}