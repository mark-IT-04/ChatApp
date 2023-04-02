import { Button, Group, Paper, ScrollArea, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const ChatBox = () => {
  // const selectedChat=localStorage.getItem('selectedChat')? JSON.parse(localStorage.getItem('selectedChat')):[]
  const navigate=useNavigate()
 const [chat_name,setChat_name]=useState('')

  useEffect(()=>{
    
      const selectedChat = localStorage.getItem('selectedChat')
      setChat_name(selectedChat.chatName)
    
  },[])
  
  
  return (
    <Paper shadow="md" radius="lg" px="lg" pt='md' pb='xl' m='xs' withBorder>
          <Group position="apart" >
            <Text  fw={500}>{chat_name}</Text>
            
          </Group>
        <ScrollArea sx={{ height: '75vh' }}>


        </ScrollArea>
            
    </Paper>
  )
}

export default ChatBox