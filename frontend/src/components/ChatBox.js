import { ActionIcon, Button, Center, Flex, Group, Paper, ScrollArea, Text, Textarea } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSendFill,BsFillEyeFill } from "react-icons/bs"
import { useSelector } from 'react-redux'


const ChatBox = params => {
    console.log(params.selectedChat)

    const userLogin = useSelector(state=>state.userLogin)
    const{userInfo}=userLogin

    const sender=(users)=>{
      return users[0]._id ===userInfo._id?users[1].name:users[0].name
    }

  return (
    <Paper shadow="md" radius="lg" px="lg" pt='md' pb='xl' m='xs' withBorder mih={'85vh'}>
        {
        Object.keys(params.selectedChat).length!==0 &&
          <Group position="apart" >
            <Text  fw={500}>
              {params.selectedChat.isGroupChat ? 
                params.selectedChat.chatName 
                : 
                sender( params.selectedChat.users)
              }
            </Text>
            <ActionIcon variant='light' size="md" radius="lg">
              <BsFillEyeFill size="1.5rem" />
            </ActionIcon>
          </Group>
        }
        <ScrollArea sx={{ height: '58vh' }}>

        {
        Object.keys(params.selectedChat).length===0 &&
        <Center mih={'85vh'}>
            <Text fz='lg' color='dimmed'>Click on user to start chatting</Text>
        </Center>
        }

        </ScrollArea>

        {
        Object.keys(params.selectedChat).length!==0 && <>
        <Group grow>
          <Textarea
          placeholder="Enter a message"
          minRows={5}
        />
        </Group>
        <Group position='right'>
          <Button color='cyan' mt='sm' radius='md' leftIcon={<BsSendFill />}>
            Send
          </Button>
        </Group>
        </>}
            
    </Paper>
  )
}

export default ChatBox