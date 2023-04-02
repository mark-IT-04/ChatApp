import React,{ useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { createGroup,renameGroup } from '../_actions/chatActions'
import { Alert, Button, Center, Group, Loader, Modal, MultiSelect, TextInput, Title, useMantineTheme } from '@mantine/core'
import { CREATE_GROUP_RESET, RENAME_GROUP_RESET} from '../_constants/chatConstants'
import { listUsers } from '../_actions/userActions';
import { TbAlertCircle } from "react-icons/tb";

const GroupChatModal = params => {
    const theme = useMantineTheme()
    const dispatch=useDispatch()

    const [gcName, setGCname] = useState('')
    const [searchValue, onSearchChange] = useState('');
    const [usersVal, setUsersVal] = useState('');

    const groupCreate =useSelector(state=>state.groupCreate)
    const {success:successAdd,loading:loadingAdd,error:errorAdd} =groupCreate

    const groupRename =useSelector(state=>state.groupRename)
    const {success:successEdit,loading:loadingEdit,error:errorEdit} =groupRename

    const userList = useSelector(state=>state.userList)
    const{loading,success, users}=userList

    
    useEffect(()=>{
          dispatch(listUsers())
      },[dispatch])

    useEffect(()=>{
        if(successAdd || successEdit ) {
          onCloseHandler()
        }  
    },[successAdd,successEdit])


    const onCloseHandler=()=>{
        dispatch({type:CREATE_GROUP_RESET})
        dispatch({type:RENAME_GROUP_RESET})
        setGCname('')
        setUsersVal('')
        params.setOpenedGModal(false)
      }


      const saveGCHandler=()=>{
        dispatch(createGroup(gcName,JSON.stringify(usersVal)))
        if(successAdd || successEdit ) onCloseHandler()
      }


  return (
    <Modal radius='lg'
        opened={params.openedGModal}
        onClose={() => onCloseHandler()}
        withCloseButton={false}
        transition="rotate-left"
        transitionDuration={250}
        transitionTimingFunction="ease"
        overlayOpacity={0.65}
      >
   
        
    <Title order={3} color='cyan' mb='md'>{params.title}</Title>
        {errorAdd  &&
          <Alert icon={<TbAlertCircle size={16} />}  color="red" radius="lg" mb='xs' withCloseButton onClose={()=>dispatch({type:CREATE_GROUP_RESET})}>
            {errorAdd}
          </Alert>
        }
        {errorEdit  &&
          <Alert icon={<TbAlertCircle size={16} />}  color="red" radius="lg" mb='xs' withCloseButton onClose={()=>dispatch({type:RENAME_GROUP_RESET})}>
            {errorEdit}
          </Alert>
        }

    {loading ?
        <Center my='xl'  pt='xl'><Loader color= 'cyan' size="sm"/></Center>  
    : <>
    <TextInput label="Group Chat Name" placeholder="Enter GC name" 
          withAsterisk 
          radius='md'
          mb='sm'
          value={ gcName }
          onChange={(event) => setGCname(event.currentTarget.value)}
    />
   
        <MultiSelect
        data={
            users.map((user)=>(
                {
                    value: user._id,
                    label: user.name
                }
            ))
        }
        label="Users"
        placeholder="Add users to GC"
        searchable
        nothingFound="Nothing found"
        clearable
        value={usersVal}
        onChange={setUsersVal}
        minSelectedValues={2}
        />
    

        <Group spacing='xs' position='right' mt='xl' mb='md'>
            {(loadingAdd || loadingEdit) ? 
            <Button color='cyan' radius='md' loading pl='xl'/>
            :
            <Button color='cyan' radius='md'  px='lg' 
               onClick={()=>saveGCHandler()}
            >Save</Button>
            }
            <Button color='gray' radius='md' onClick={()=>onCloseHandler()}>Close</Button>
        </Group>

        </>}
      </Modal>
  )
}

export default GroupChatModal