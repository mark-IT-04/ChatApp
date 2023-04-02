import { Button, Grid, Group, MediaQuery, Paper, ScrollArea, Text } from '@mantine/core';
import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const ChatScreen = () => {
 
  

  return (
    <Grid grow gutter={0} >
      <Grid.Col xs={12} sm={4}>
        <MyChats/>
      </Grid.Col>

      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Grid.Col  sm={8} >
          <ChatBox/>
        </Grid.Col>
      </MediaQuery>
    </Grid>
  )
}

export default ChatScreen