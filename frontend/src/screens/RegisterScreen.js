import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
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
    FileInput,rem,
    Button,
  } from '@mantine/core';
  // import { TbUpload } from 'react-icons/tb';
  import {register} from '../_actions/userActions'
  import { useForm, isEmail,hasLength } from '@mantine/form';
import { USER_REGISTER_RESET } from '../_constants/userConstants';
import { TbAlertCircle } from "react-icons/tb";


const RegisterScreen = () => {
  const form = useForm({
    initialValues: {
      name:'',
      email: '',
      password: ''
    }, 
    validate:{
      name: hasLength({ min: 3 }, 'Name must be at least 3 characters long'),
      email: isEmail('Invalid email'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const userRegister =useSelector(state=>state.userRegister)
  const {loading,error,success} =userRegister

  useEffect(()=>{
    if(success)
      navigate('/login')
    
  },[success])

  return (<>
    <Container size={420} my={30}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Sign Up
      </Title>
      

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {error  &&
          <Alert icon={<TbAlertCircle size={16} />}  color="red" radius="lg" mb='xs' withCloseButton 
          onClose={()=>dispatch({type: USER_REGISTER_RESET})}
          >
            {error}
          </Alert>
        }
        <form onSubmit={form.onSubmit((values)=>dispatch(register(values.name,values.email,values.password)))}>
          <TextInput label="Name" placeholder="Enter your Name" required radius='md'
            {...form.getInputProps('name')}
          />
          <TextInput label="Email" placeholder="Enter your Email Address" required radius='md' mt="md"
            {...form.getInputProps('email')}
          />
          <PasswordInput label="Password" placeholder="Enter password" required mt="md" radius='md'
            {...form.getInputProps('password')}
          />
          <PasswordInput label="Confirm Password" placeholder="Confirm password" required mt="md" radius='md'
            {...form.getInputProps('confirmPassword')}
          />
          {/* <FileInput label="Upload your picture" placeholder="Your picture" mt="md" icon={<TbUpload size={rem(14)} />} /> */}
        
          {loading ?
            <Button 
              fullWidth mt="xl" radius='md' color='cyan' loading>
              Sign up
            </Button>
            :
            <Button 
              fullWidth mt="xl" radius='md' color='cyan'type='submit'>
              Sign up
            </Button>
          }
        </form>
      </Paper>
    </Container>
    </>)
}

export default RegisterScreen