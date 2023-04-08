import React,{ useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { createGroup,updateGroup } from '../_actions/chatActions'
import { Alert, Button, Center, Group, Loader, Modal, MultiSelect, TextInput, Title } from '@mantine/core'
import { CREATE_GROUP_RESET, UPDATE_GROUP_RESET} from '../_constants/chatConstants'
import { listUsers } from '../_actions/userActions';
import { TbAlertCircle } from "react-icons/tb";
import useShareableState from '../useShareableState'
import { useBetween } from 'use-between';

const GroupChatModal = params => {
  const { selectedChat,setSelectedChat,setActiveID } = useBetween(useShareableState) 
 
    const dispatch=useDispatch()

    const [gcName, setGCname] = useState('')
    const [usersVal, setUsersVal] = useState([]);

    const groupCreate =useSelector(state=>state.groupCreate)
    const {success:successAdd,loading:loadingAdd,error:errorAdd,group:newGroup} =groupCreate

    const groupUpdate =useSelector(state=>state.groupUpdate)
    const {success:successEdit,loading:loadingEdit,error:errorEdit,group:updatedGroup} =groupUpdate

    const userList = useSelector(state=>state.userList)
    const{success, users}=userList

    useEffect(()=>{
      if(Object.keys(selectedChat).length!==0 && params.title==="Update Group"){
      setGCname(selectedChat.chatName)
      setUsersVal(
        selectedChat.users.map((user)=>(
          user._id           
        ))
      )}
  },[selectedChat]) 

    useEffect(()=>{
          dispatch(listUsers())
      },[dispatch])

    useEffect(()=>{
        if(successAdd || successEdit ) 
          onCloseHandler()   
       
        if(successEdit) setSelectedChat(updatedGroup) 
        if(successAdd) {
          setSelectedChat(newGroup)
          setActiveID(newGroup._id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[successAdd,successEdit])


    const onCloseHandler=()=>{
        dispatch({type:CREATE_GROUP_RESET})
        dispatch({type:UPDATE_GROUP_RESET})
        setGCname('')
        setUsersVal('')
        params.setOpenedGModal(false)
      }


      const saveGCHandler=()=>{
        if(params.title==="Create Group")
          dispatch(createGroup(gcName,JSON.stringify(usersVal)))
        else
          dispatch(updateGroup(selectedChat._id,gcName,JSON.stringify(usersVal)))
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
          <Alert icon={<TbAlertCircle size={16} />}  color="red" radius="lg" mb='xs' withCloseButton onClose={()=>dispatch({type:UPDATE_GROUP_RESET})}>
            {errorEdit}
          </Alert>
        }

    
    <TextInput label="Group Chat Name" placeholder={"Enter GC name" }
          withAsterisk 
          radius='md'
          mb='sm'
          value={gcName}
          onChange={(event) => setGCname(event.currentTarget.value)}
         
    />
   {!success ?
        <Center my='xl'  pt='xl'><Loader color= 'cyan' size="sm"/></Center>  
    : <>
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
        dropdownPosition="top"
        maxDropdownHeight={120}
        
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