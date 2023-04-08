import { Button, Grid, Group, MediaQuery, Paper, ScrollArea, Text } from '@mantine/core';
import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import useShareableState from '../useShareableState'
import { useBetween } from 'use-between';

const ChatScreen = () => {
  const {clicked,setClicked,unclicked,setunClicked} = useBetween(useShareableState) 

 
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
        <Grid.Col xs={12} sm={5}>
          <MyChats clicked={clicked} clickedHandler={()=>clickedHandler()}/>
        </Grid.Col>
      </MediaQuery>

      <MediaQuery smallerThan="sm" styles={{ display: unclicked ? 'none' :''}}>
        <Grid.Col  sm={7} >
          <ChatBox unclicked={unclicked} unClickedHandler={()=>unClickedHandler()}/>
        </Grid.Col>
      </MediaQuery>
    </Grid>
  </>)
}

export default ChatScreen