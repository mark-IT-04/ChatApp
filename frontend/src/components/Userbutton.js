
import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UnstyledButton, Popover,Group, Text, Box, useMantineTheme,Button } from '@mantine/core';
import { TbLogout,TbUserCircle, TbChevronDown } from "react-icons/tb";
import ModalConfirm from '../modals/ModalConfirm';
import {logout} from '../_actions/userActions'
import { TbCheck } from "react-icons/tb"
import { showNotification } from '@mantine/notifications'
import { FaUserAlt } from "react-icons/fa";
import Avatar from 'react-avatar'

 

const Userbutton = () => {
    const theme = useMantineTheme();
    const [modalOpened, setModalOpened] = useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

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
    <Group>
   <Popover width={150} position="bottom-end" radius='lg' shadow="md">
    <Popover.Target>
        <UnstyledButton>
          <Group spacing={5}>
            <Avatar
              name={userInfo.name}
              round={true}
              size={'30px'}
            />
            <TbChevronDown size={15} color='white'/> 
          </Group>
        </UnstyledButton>
      </Popover.Target>

      <Popover.Dropdown >
            
        <Text size="sm" weight={700} color='gray' mb='xs'>
          {userInfo.name}
        </Text>
           
        <Button variant='white'  leftIcon={<TbLogout size={20} />} radius="lg" size="sm"
          sx={{'&:hover': {backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.cyan[0],
            },
          }} color='cyan'
          onClick={()=>setModalOpened(true)}
        >
          Logout
        </Button>
      </Popover.Dropdown>
    </Popover>
  </Group>


  <ModalConfirm modalOpened={modalOpened} setModalOpened={setModalOpened} handler={logoutHandler}
    msg='Are you sure you want to logout?' btnText='Log Out'
  />
</>
  )
}

export default Userbutton