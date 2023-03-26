import { Avatar, Button, Group, Modal, Text, useMantineTheme } from '@mantine/core'
import React from 'react'
import { TbQuestionMark } from "react-icons/tb"

const ModalConfirm = ({modalOpened,setModalOpened,handler,msg,btnText,loading=false}) => {
    const theme = useMantineTheme()
  return (
    <Modal
      opened={modalOpened}
      withCloseButton={false}
      onClose={() => setModalOpened(false)}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={btnText==='Log Out' ? 3 : 0}
      radius="md"
      size="xs" 
    >
    <Group position="center">
      <Avatar color="cyan" radius="xl" size="lg" align='center'>
        <TbQuestionMark size={45} />
      </Avatar>
    </Group>
      <Text size="md" mt="sm" align="center">{msg}</Text>
      <Group position="center" mt="lg" spacing="xs">
      {loading ?
        <Button color="cyan" radius="md" loading  pl='xl'/>
      :
        <Button color="cyan" radius="md" px='xl' onClick={() => handler()}>
         {btnText}
        </Button>
      }
        
        <Button color="gray" radius="md" onClick={() => setModalOpened(false)}>
          Cancel
        </Button>
      </Group>
    </Modal>
  )
}

export default ModalConfirm