import { Button, Center, Group, Loader, Paper, ScrollArea, Stack, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import { fetchChat } from '../_actions/chatActions'
import { useDispatch, useSelector } from 'react-redux'
import GroupChatModal from './GroupChatModal'
import ChatBox from './ChatBox'

const MyChats = () => {
  const selectedChat=localStorage.getItem('selectedChat')? JSON.parse(localStorage.getItem('selectedChat')):[]
  const [openedGModal, setOpenedGModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Create Group')

    const dispatch=useDispatch()
    

    const userLogin = useSelector(state=>state.userLogin)
    const{userInfo}=userLogin

    const chatFetch = useSelector(state=>state.chatFetch)
    const{loading,success, chats}=chatFetch


    useEffect(()=>{
      dispatch(fetchChat())
    },[dispatch])

    

    const sender=(users)=>{
      return users[0]._id ===userInfo._id?users[1].name:users[0].name
    }

    const loadChats=(chatName,chatId)=>{
      localStorage.setItem('selectedChat',JSON.stringify({chatName,chatId}))
      
      }

    
  return (<>
    <Paper shadow="md" radius="lg" px="lg" pt='md' pb='xl' m='xs' withBorder>
          <Group position="apart">
            <Text  fw={500}>My Chats</Text>
            <Button variant="light" color="cyan" radius="md" leftIcon={<AiOutlinePlus />} size="xs"
            onClick={()=>setOpenedGModal(true)}
            >
              New Group Chat
            </Button>
          </Group>
          <ScrollArea sx={{ height: '75vh' }} >
          {loading ? 
                <Center mt='xl' pt='xl'><Loader color= 'cyan' size="sm"/></Center>  
            :
           
                chats.map((chat)=>(
                <Paper  radius="md" p="sm" key={chat._id} my='xs'
                   withBorder sx={{cursor:'pointer'}}
                   onClick={()=>loadChats(!chat.isGroupChat ? sender(chat.users): chat.chatName,chat._id)}
                >
                    <Stack spacing={0}>
                        <Text fz="sm">
                        {
                          !chat.isGroupChat ? 
                          sender(chat.users)
                          : chat.chatName
                        }
                        </Text>
                      
                    </Stack>
                    
                </Paper>
            ))
                
            }

          </ScrollArea>
            
        </Paper>

        <GroupChatModal openedGModal={openedGModal} setOpenedGModal={setOpenedGModal} title={modalTitle}/>
  </>)
}

export default MyChats