import { ActionIcon, Box, Button, Center, Flex, Group, Loader, Modal, Paper, MediaQuery, Space, Stack, Text, Textarea, Tooltip } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeftShort,BsFillEyeFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage,allMessages } from '../_actions/messageAction'
import ScrollableFeed from 'react-scrollable-feed'
import GroupChatModal from './GroupChatModal'
import InputEmoji from "react-input-emoji";
import Avatar from 'react-avatar'

import io from "socket.io-client"
const ENDPOINT="http://localhost:8081"
var socket, selectedChatCompare

const ChatBox = params => {
    const [newMsg,setNewMsg]=useState('')

    const userLogin = useSelector(state=>state.userLogin)
    const{userInfo}=userLogin
    const [socketConnected,setSocketConnected]=useState(false)
    const [modalOpen,setModalOpen]=useState(false)

    const dispatch=useDispatch()

    const messagesAll = useSelector(state=>state.messagesAll)
    const{loading, success:successLoad,messages}=messagesAll

    const messageSend = useSelector(state=>state.messageSend)
    const{success:successSend,message:sentMessage}=messageSend

    useEffect(()=>{
          socket=io(ENDPOINT)
          socket.emit("setup",userInfo)
          socket.on("connection",()=>setSocketConnected(true))
        },[])

    useEffect(()=>{
      if(Object.keys(params.selectedChat).length!==0){
        dispatch(allMessages(params.selectedChat._id))
        socket.emit("join chat",params.selectedChat._id)
        selectedChatCompare = params.selectedChat 
      }
      if (successSend) socket.emit("new message", sentMessage);
    },[params.selectedChat,successSend])

    

    useEffect(() => {
      socket.on("message recieved", (newMessageRecieved) => {
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          // if (!notification.includes(newMessageRecieved)) {
          //   setNotification([newMessageRecieved, ...notification]);
          //   setFetchAgain(!fetchAgain);
          // }
        } else {
            dispatch(allMessages(selectedChatCompare._id))
        }
        
      })
    },[selectedChatCompare])
    
    const sender=(users)=>{
      if(Object.keys(params.selectedChat).length!==0 )
      return users[0]._id ===userInfo._id?users[1].name:users[0].name
    }
    const senderEmail=(users)=>{
      if(Object.keys(params.selectedChat).length!==0 )
      return users[0]._id ===userInfo._id?users[1].email:users[0].email
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
     
        if(newMsg!==''){
          dispatch(sendMessage(newMsg,params.selectedChat._id))
        }
        setNewMsg("")
      
    }

    const openModalHandler=()=>{
      setModalOpen(true)
    }
    

  return (<>
    <Paper shadow="md" radius="lg" px="md" pt='md' pb='xl' m='xs' withBorder mih={'85vh'} mah={'85vh'}>
        {
        Object.keys(params.selectedChat).length!==0 && <>
          <Group position="apart" mb='md'>
            <Group spacing='xs'>
            <MediaQuery largerThan="sm" styles={{display:  'none'}}>
              {params.clicked &&
                <ActionIcon variant='light' size="md" radius="lg" color='cyan'>
                  <BsArrowLeftShort size="2.5rem" onClick={()=>params.setClicked(false)}/>
                </ActionIcon>
              }
              </MediaQuery>
                <Text  fz='lg' fw={500}>
                  {params.selectedChat.isGroupChat ? 
                    params.selectedChat.chatName 
                    : 
                    sender( params.selectedChat.users)
                  }
                </Text>
            </Group>

            <ActionIcon variant='light' size="md" radius="lg">
              <BsFillEyeFill size="1.5rem" onClick={()=>openModalHandler()}/>
            </ActionIcon>
          </Group>
        </>}
       
        {
        Object.keys(params.selectedChat).length===0 ?
        <Center mih={'80vh'}>
            <Text fz='lg' color='dimmed'>Click on user to start chatting</Text>
        </Center>
        : <>
        {!successLoad ?
          <Center mih={'80vh'}>
            <Loader color= 'cyan' />
          </Center>
        : <>
        <Box style={{height:'55vh'}}>
          <ScrollableFeed >
                    
            {messages.map((msg,i)=>(  
              <Group position={msg.sender._id===userInfo._id ? "right" : "#left"} spacing='xs'
              mr='xs'
              >
                {(isSameSender(messages,msg,i,userInfo._id) || isLastMsg(messages,i,userInfo._id)) ? 
                  <Tooltip
                    label={msg.sender.name}
                    color="gray"
                    position="bottom-start"
                    withArrow
                  >
                    <Avatar
                      name={msg.sender.name}
                      round={true}
                      size={'30px'}
                      // radius="xl" size='sm'
                    />
                  </Tooltip>
                  :
                  <Space w='xl'/>
                }
                <span style={{
                  backgroundColor:`${
                    msg.sender._id===userInfo._id ? "#82ccdd" : "#dfe6e9"   
                  }`,
                  borderRadius: "20px",
                  padding:"5px 15px",
                  marginBottom:"8px",
                  display:"block",
                  maxWidth:"250px",
                  wordWrap:"break-word",
                }}>
                  {msg.content}
                </span>
              </Group>
            ))} 
          
            </ScrollableFeed>   
          </Box>

       
          <Group mt='xl'
          style={{
                display:"block",
                maxWidth:"58vw",
                wordWrap:"break-word",
              }}
          >
            <InputEmoji
              value={newMsg}
              onChange={setNewMsg}
              placeholder="Type a message"
              onEnter={sendMsg}
            />
          </Group>
        
        </>}
         
        </>}
            
    </Paper>
    {params.selectedChat.isGroupChat ?
      <GroupChatModal openedGModal={modalOpen} setOpenedGModal={setModalOpen} title={'Edit Group'}/>
    :
    <Modal opened={modalOpen} onClose={()=>setModalOpen(false)} title=" " size='xs' radius='md'> 
        <Stack align='center' spacing={0} mb='lg'>
          <Avatar
            name={sender(params.selectedChat.users)}
            round={true}
            size={'75px'}
            // radius="xl" size='xl' mb='xs'
          />

          <Text >{sender(params.selectedChat.users)}</Text>
          <Text >{senderEmail(params.selectedChat.users)}</Text>
        </Stack>
    </Modal>
    }
  </>)
}

export default ChatBox