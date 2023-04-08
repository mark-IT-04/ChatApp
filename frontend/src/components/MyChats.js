import { Button, Center, Group, Loader, Paper, ScrollArea, Stack, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import { fetchChat } from '../_actions/chatActions'
import { useDispatch, useSelector } from 'react-redux'
import GroupChatModal from './GroupChatModal'
import Avatar from 'react-avatar'
import useShareableState from '../useShareableState'
import { useBetween } from 'use-between';

const MyChats = params => {
  const { setSelectedChat,activeID, setActiveID,setNotification,notification } = useBetween(useShareableState)
  const [openedGModal, setOpenedGModal] = useState(false);

    const dispatch=useDispatch()
    

    const userLogin = useSelector(state=>state.userLogin)
    const{userInfo}=userLogin

    const chatFetch = useSelector(state=>state.chatFetch)
    const{loading, chats}=chatFetch


    useEffect(()=>{
      dispatch(fetchChat())
      
    },[dispatch])

    

    const sender=(users)=>{
      return users[0]._id ===userInfo._id?users[1].name:users[0].name
    }

    const loadChats=(chat)=>{
      setSelectedChat(chat)
      setActiveID(chat._id)
      params.clickedHandler()
    }

   
  return (<>
    <Paper shadow="md" radius="lg" px="lg" pt='md' pb='xl' m='xs' withBorder mih={'85vh'} mah={'85vh'}>
          <Group position="apart">
            <Text  fz='lg' fw={500}>My Chats</Text>
            <Button variant="light" color="cyan" radius="md" leftIcon={<AiOutlinePlus />} size="sm"
            onClick={()=>setOpenedGModal(true)}
            >
              New Group Chat
            </Button>
          </Group>
          <ScrollArea sx={{ height: '70vh' }} >
          {loading ? 
                
                <Center mt='xl' pt='xl'><Loader color= 'cyan' size="sm"/></Center>  
            :           
                chats.map((chat)=>(
                <Paper  radius="md" p="sm" key={chat._id} my='xs'
                   withBorder 
                   onClick={()=>loadChats(chat)}
                   sx={()=>({
                    cursor:'pointer',
                    backgroundColor:chat._id===activeID ? '#82ccdd': 'transparent',
                      '&:hover': {
                          backgroundColor:'#82ccdd',
                          color:'white'
                        }
                    })}
                  
                >
                    <Stack spacing={0}>
                    <Group key={chat._id}>
                        <Avatar
                            name={!chat.isGroupChat ? sender(chat.users): chat.chatName}
                            round={true}
                            size={'30px'}
                        />
                      <Text fz="md">
                        {
                          !chat.isGroupChat ? 
                          sender(chat.users)
                          : chat.chatName
                        }
                        </Text>
                    </Group>
                                              
                    </Stack>
                    
                </Paper>
            ))
                
            }

          </ScrollArea>
            
        </Paper>

        <GroupChatModal openedGModal={openedGModal} setOpenedGModal={setOpenedGModal} title={'Create Group'}/>
  </>)
}

export default MyChats