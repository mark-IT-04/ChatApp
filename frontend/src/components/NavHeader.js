import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Group,  Box ,Title,  ActionIcon,  Popover, Text, Indicator } from '@mantine/core';
 import {logout} from '../_actions/userActions'
import { showNotification } from '@mantine/notifications'
import { TbCheck } from "react-icons/tb"
import { FaBell } from "react-icons/fa"
import ModalConfirm from '../modals/ModalConfirm';
import Userbutton from './Userbutton';
import SideDrawer from './SideDrawer';
import useShareableState from '../useShareableState'
import { useBetween } from 'use-between';

const NavHeader = ({opened,setOpened}) => {
  const { setNotification,notification ,setSelectedChat, setActiveID,setClicked,setunClicked} = useBetween(useShareableState) 
  
  const [modalOpened, setModalOpened] = useState(false)

  const userLogin = useSelector(state=> state.userLogin)
  const {userInfo} = userLogin
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const rdrt_main=()=>{navigate('/')}

  const logoutHandler=()=>{ 
    setModalOpened(false)
      dispatch(logout())
      showNotification({
        icon:<TbCheck size={18} />,
        color:"teal",
        title: 'Success!',
        message: 'Logout successful!',
        radius:"lg"
      })
      navigate('/') 
  }

  const sender=(users)=>{
    return users[0]._id ===userInfo._id?users[1].name:users[0].name
  }

  const loadChats=(notific)=>{
    setSelectedChat(notific.chat)
    setActiveID(notific.chat._id)
    setNotification(notification.filter ((n)=>n!==notific))
    setClicked(true)
    setunClicked(false)
  }
    return (<>
      <Box
        sx={(theme) => ({
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs,
        })}
      >
      <Group position="apart">
        <Group position="left">
          {/* <Avatar src="/MARKSPACE.png" alt="myLogo" size='sm'/> */}
          <Title order={2} color='white' onClick={()=>rdrt_main()} style={{cursor:'pointer'}}>ChatApp</Title>
          {userInfo && 
            <SideDrawer/>
          }
        </Group>
        
          {userInfo && 
           
            <Group>
              <Popover position="bottom-end" radius='lg' shadow="md">
                <Popover.Target>
                {notification.length===0 
                ?
                    <ActionIcon  size="sm" radius="xl" variant="transparent">
                        <FaBell size="xs" color='white'/>
                    </ActionIcon>
                :
                  <Indicator color="red" position="bottom-end">
                    <ActionIcon  size="sm" radius="xl" variant="transparent">
                        <FaBell size="xs" color='white'/>
                    </ActionIcon>
                  </Indicator>
                }
                  
                </Popover.Target>
                <Popover.Dropdown>
                  {!notification.length ? 
                    <Text size="sm" weight={500} color='gray' style={{cursor:'pointer'}}>
                     No new messages
                    </Text>
                  :
                  notification.map(notif=>(
                      notif.chat.isGroupChat ? 
                      <Text size="sm" weight={500} color='gray' p={'5px'} onClick={()=>loadChats(notif) }
                      sx={()=>({
                        cursor:'pointer',
                           '&:hover': {
                              color:'#82ccdd',
                            }
                        })}
                      >
                          New Message in {notif.chat.chatName}  
                      </Text>
                      : 
                      <Text size="sm" weight={500} color='gray'  p={'5px'} onClick={()=>loadChats(notif)}
                        sx={()=>({
                          cursor:'pointer',
                             '&:hover': {
                              color:'#82ccdd',
                              }
                          })}
                      >
                        New Message from {sender(notif.chat.users)} 
                      </Text>
                    ))
                  }
                </Popover.Dropdown>
              </Popover>
              <Userbutton/>
            </Group>
            
            
          //:
            /* <Link to='/login'>
              <Button leftIcon={<BiLogIn size={22}/>} size='sm' color="cyan" radius="md">
                Login
              </Button>
            </Link> */
          }
          
       </Group>
      </Box>
      
   <ModalConfirm modalOpened={modalOpened} setModalOpened={setModalOpened} handler={logoutHandler}
    msg='Are you sure you want to logout?' btnText='Log Out'
   />

    </>)
}

export default NavHeader