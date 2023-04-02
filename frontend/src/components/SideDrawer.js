import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, Avatar, Button, Center, Drawer, Group, Input, Loader, Paper, ScrollArea, Stack, Text, Tooltip } from '@mantine/core'
import { BiSearch } from "react-icons/bi"
import { listUsers } from '../_actions/userActions';
import { accessChat } from '../_actions/chatActions';

const SideDrawer = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [keyword, setKeyword] = useState('');
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const userLogin = useSelector(state=>state.userLogin)
    const{userInfo}=userLogin

    const userList = useSelector(state=>state.userList)
    const{loading,success, users}=userList


    useEffect(()=>{
        if(!userInfo){
          navigate('/')
        }else{
          dispatch(listUsers(keyword))
        }      
      },[dispatch,keyword])



      const addChatHandler=(userId)=>{
        dispatch(accessChat(userId))
        close()
        // window.location.reload(false);
      }



  return (
    <>
        <Tooltip
            label="Search chat users"
            color="gray"
            position="right"
            withArrow
        > 
            <ActionIcon  size="md" radius="xl" variant="transparent" onClick={open}>
                <BiSearch size="xs" color='white'/>
            </ActionIcon>
        </Tooltip>

        <Drawer
            opened={opened}
            onClose={close}
            title="Search Chat Users"
            overlayProps={{ opacity: 0.5, blur: 4 }}
           
        >        
                <Input
                    variant="filled"
                    placeholder="Search"
                    radius="md"
                   
                    onChange={(event)=>setKeyword(event.currentTarget.value)}
                    />
              <ScrollArea sx={{ height: '75vh' }}>      
            {loading && 
                <Center mt='xl' pt='xl'><Loader color= 'cyan' size="sm"/></Center>  
            }
            {success &&
                users.map((user)=>(
                <Paper shadow='sm' radius="lg" p="sm" key={user._id} my='xs'
                   withBorder sx={{cursor:'pointer'}}
                   onClick={()=>addChatHandler(user._id)}
                >
                    <Group>
                        <Avatar
                            src={user.pic}
                            radius="xl" size='sm'
                        />
                        <Stack spacing={0}>
                            <Text fw={500}>{user.name}</Text>
                            <Text fz="sm">{user.email} </Text>
                        </Stack>
                    </Group>
                </Paper>
            ))
                
            }
            </ScrollArea> 
        </Drawer>
    </>
    )
}

export default SideDrawer