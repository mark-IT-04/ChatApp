import React from 'react'
import axios from 'axios'
import { showNotification } from '@mantine/notifications';
import { TbCheck,TbX } from "react-icons/tb";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,    
} from '../_constants/userConstants'

const notifyMsg=(msg,mode)=>{
    showNotification({
        icon:mode==='success'?<TbCheck size={18} />:<TbX size={18}/>,
        color:mode==='success'?"teal":"red",
        title: mode==='success'?'Success':'Error',
        message: msg,
        radius: 'md' 
      })
}

export const login = (email,password) => async (dispatch) =>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }            
        }

        const {data}=await axios.post('/users/login',{email,password},config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
        
        notifyMsg('Login successful!','success')

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const logout = () => (dispatch)=>{
    localStorage.removeItem('userInfo')

    dispatch({type: USER_LOGOUT})
}

export const listUsers = (keyword='') => async (dispatch,getState) =>{
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{ 
                Authorization:`Bearer ${userInfo.token}`
            },            
        }

        const {data}=await axios.get(`/users?keyword=${keyword}`,config)
        
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
        
        
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const register = (name,email,password) => async (dispatch,getState) =>{
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })


        const config = {
            headers:{ 
                'Content-Type': 'application/json',
            },            
        }

        const {data}=await axios.post('/users/register',{name,email,password},config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
          notifyMsg('Your account was successfully registred!','success')

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response  && error.response.data.message
                ? error.response.data.message
                : error.message
        })
       
    }
    
}