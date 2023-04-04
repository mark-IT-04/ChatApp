import { ActionIcon, Avatar, Button, Center, Flex, Group, Loader, Paper, ScrollArea, Space, Stack, Text, Textarea, Tooltip } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSendFill,BsFillEyeFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage,allMessages } from '../_actions/messageAction'


const ChatBox = params => {
    const [newMsg,setNewMsg]=useState('')

    const userLogin = useSelector(state=>state.userLogin)
    const{userInfo}=userLogin

    const dispatch=useDispatch()

    const messagesAll = useSelector(state=>state.messagesAll)
    const{loading, messages}=messagesAll

    const messageSend = useSelector(state=>state.messageSend)
    const{success:successSend}=messageSend

    useEffect(()=>{
      if(Object.keys(params.selectedChat).length!==0)
        dispatch(allMessages(params.selectedChat._id))
    },[dispatch,params.selectedChat,successSend])


    const sender=(users)=>{
      return users[0]._id ===userInfo._id?users[1].name:users[0].name
    }

    const isSameSender=(msgs, m,i,userId)=>{
      return(
        i<msgs.length-1 &&
        (msgs[i+1].sender._id!==m.sender._id || msgs[i+1].sender._id=== undefined) &&
        msgs[i].sender._id!==userId
      )
    }

    const isLastMsg=(msgs, i,userId)=>{
      return(
        i===msgs.length-1 &&
        msgs[msgs.length-1].sender._id!==userId && msgs[msgs.length-1].sender._id
      )
    }
    

    const sendMsg=()=>{
      if(newMsg!=='')
        dispatch(sendMessage(newMsg,params.selectedChat._id))
      setNewMsg("")
    }
// console.log(messages)


  return (
    <Paper shadow="md" radius="lg" px="lg" pt='md' pb='xl' m='xs' withBorder mih={'85vh'} mah={'85vh'}>
        {
        Object.keys(params.selectedChat).length!==0 &&
          <Group position="apart" mb='md'>
            <Text  fz='lg' fw={500}>
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
       



        {
        Object.keys(params.selectedChat).length===0 ?
        <Center mih={'80vh'}>
            <Text fz='lg' color='dimmed'>Click on user to start chatting</Text>
        </Center>
        : <>
        {loading ?
          <Center mih={'80vh'}>
            <Loader color= 'cyan' />
          </Center>
        : <>
        <ScrollArea mih={'55vh'}>
          <Stack justify="flex-end" spacing='xs'>
          
          {messages.map((msg,i)=>(  
            <Group position={msg.sender._id===userInfo._id ? "right" : "#left"} spacing='xs'>
              {(isSameSender(messages,msg,i,userInfo._id) || isLastMsg(messages,i,userInfo._id)) ? 
                <Tooltip
                  label={msg.sender.name}
                  color="gray"
                  position="bottom-start"
                  withArrow
                >
                  <Avatar
                    src={msg.sender.pic}
                    radius="xl" size='sm'
                  />
                </Tooltip>
                :
                <Space w='xl'/>
              }
              <span style={{
                backgroundColor:`${
                  msg.sender._id===userInfo._id ? "#74b9ff" : "#dfe6e9"   
                }`,
                borderRadius: "20px",
                padding:"5px 15px",
              }}>
                {msg.content}
              </span>
            </Group>
          ))} 
          </Stack>        
         
         </ScrollArea>        

        <Stack spacing={0}>
          <Group grow>
            <Textarea
            placeholder="Enter a message"
            minRows={4}
            value={newMsg}
            onChange={(event)=>setNewMsg(event.currentTarget.value)}
            />
          </Group>
          <Group position='right'>
            <Button color='cyan' mt='sm' radius='md' leftIcon={<BsSendFill />}
              onClick={()=>sendMsg()}
            >
              Send
            </Button>
          </Group>
        </Stack>
        </>}
         
        </>}
            
    </Paper>
  )
}

export default ChatBox