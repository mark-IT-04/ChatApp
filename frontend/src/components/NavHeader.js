import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { Group,  Box ,Avatar,Title,Button, MediaQuery, ActionIcon, Tooltip } from '@mantine/core';
import { BiLogIn,BiLogOut } from 'react-icons/bi';
 import {logout} from '../_actions/userActions'
import { showNotification } from '@mantine/notifications'
import { TbCheck } from "react-icons/tb"
import { FaBell } from "react-icons/fa"
import ModalConfirm from '../modals/ModalConfirm';
import Userbutton from './Userbutton';
import SideDrawer from './SideDrawer';

const NavHeader = ({opened,setOpened}) => {
  
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
              <ActionIcon  size="sm" radius="xl" variant="transparent">
                  <FaBell size="xs" color='white'/>
              </ActionIcon>

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