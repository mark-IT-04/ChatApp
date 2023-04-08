import React,{useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Alert,
    Button,
  } from '@mantine/core';
  import { useForm, isEmail } from '@mantine/form';
  import {login} from '../_actions/userActions'
  import { TbAlertCircle } from "react-icons/tb";
import { USER_LOGOUT } from '../_constants/userConstants';


const LoginScreen = () => {
  
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    }, 
    validate:{
      email: isEmail('Invalid email'),
    } 
  });

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const userLogin =useSelector(state=>state.userLogin)
  const {loading,error,userInfo} =userLogin

 
  useEffect(()=>{dispatch({type: USER_LOGOUT})},[dispatch])

  useEffect(()=>{
    if(userInfo){
      navigate('/chats')
    }
  },[dispatch,navigate,userInfo])

  


  return (<>
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5} >
        Do not have an account yet?{' '}
        <Link to='/register'>
            <Anchor size="sm" component="button">
                Create account
            </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" 
        
      >
      {error  &&
          <Alert icon={<TbAlertCircle size={16} />}  color="red" radius="lg" mb='xs' withCloseButton 
          onClose={()=>dispatch({type: USER_LOGOUT})}
          >
            {error}
          </Alert>
        }
        <form onSubmit={form.onSubmit((values)=>dispatch(login(values.email,values.password)))}>
          <TextInput 
            label="Email" placeholder="you@email.com" required radius='md'
            {...form.getInputProps('email')}
            onClick={()=>dispatch({type: USER_LOGOUT})}
          />
          <PasswordInput 
            label="Password" placeholder="Your password" required mt="md" radius='md'
            {...form.getInputProps('password')}
            onClick={()=>dispatch({type: USER_LOGOUT})}
          />
          {loading ?
            <Button 
              fullWidth mt="xl" radius='md' color='cyan' loading>
              Sign in
            </Button>
            :
            <Button 
              fullWidth mt="xl" radius='md' color='cyan'type='submit'>
              Sign in
            </Button>
          }
        </form>
      </Paper>
    </Container>
    </>)
}

export default LoginScreen