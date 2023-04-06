import { Button, Grid, Group, MediaQuery, Paper, ScrollArea, Text } from '@mantine/core';
import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const ChatScreen = () => {
 const [selectedChat,setSelectedChat]=useState({})
 const [clicked,setClicked]=useState(false)
 const [unclicked,setunClicked]=useState(true)
 
 const clickedHandler=()=>{
  setClicked(true)
  setunClicked(false)
 }
 const unClickedHandler=()=>{
  setClicked(false)
  setunClicked(true)
 }

  return (<>
    <Grid grow gutter={0} >
      <MediaQuery smallerThan="sm" styles={{ display: clicked ? 'none' :''}}>
        <Grid.Col xs={12} sm={4}>
          <MyChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} 
                  clicked={clicked} clickedHandler={()=>clickedHandler()}/>
        </Grid.Col>
      </MediaQuery>

      <MediaQuery smallerThan="sm" styles={{ display: unclicked ? 'none' :''}}>
        <Grid.Col  sm={8} >
          <ChatBox selectedChat={selectedChat} setSelectedChat={setSelectedChat} 
                  unclicked={unclicked} unClickedHandler={()=>unClickedHandler()}/>
        </Grid.Col>
      </MediaQuery>
    </Grid>
  </>)
}

export default ChatScreen