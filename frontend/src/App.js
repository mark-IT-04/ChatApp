import React,{ useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {  AppShell, Header,  useMantineTheme} from '@mantine/core';
import NavHeader from './components/NavHeader'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ChatScreen from './screens/ChatScreen';

const App = () => {
  const userLogin = useSelector(state=> state.userLogin)
  const {userInfo} = userLogin
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const setPenFunc=()=>{setOpened(!opened)}

  return (
    <Router>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}     
          
     header={
        <Header height={70} p="md" sx={(theme) => ({backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.cyan})}>
            <NavHeader opened={opened} setOpened={setPenFunc}/>
        </Header>
      }
    >   

        <Routes>
          {userInfo ? 
            <Route path='/' element={<ChatScreen/>} />  
          : 
          <>
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/' element={<LoginScreen/>} />  
          </>
          }
             
          <Route path="*" element={<NotFoundScreen/>}/>
            
        </Routes>

    </AppShell>
    </Router>   
  )
}

export default App