import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Email , Lock , Person} from '@mui/icons-material'
import {signup} from '../Authentication/userActions'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
border : 2px solid red;
margin : auto;
width : 500px;
height : auto;
margin-top: 10%;
border-radius : 20px;
`
const Title = styled.h1`
padding-left : 100px;
padding-right : 100px;
padding-bottom : 10px;
text-align : center;
border-bottom : 2px solid black;
&:hover{
    color : blue;
}

`

const Form = styled.form`
display : flex;
flex-direction : column;

`

const Input = styled.input`

height : 20px;
width : 200px;
margin : auto;
border :none;
margin-bottom : 10px;
border-radius : 10px ;
color : teal;

outline: none;

&:hover{
  border : none;
}

`

const Label = styled.label`
color : blue;
font-size : 25px;
text-align : center;
&:hover{
    color : red;
}
`

const Button = styled.button`
color : green;
border : 2px solid black;
width : 220px;

margin: auto;
margin-top : 20px;
border-radius: 10px;
background-color : #fff;
font-size : 20px;
padding : 10px;

 &:hover{
    color : red;
 }
`
const Redirect = styled.p` 
text-align : center;
`
const Link = styled.a`
text-decoration: inherit;
`
const InputContainer = styled.div`

display : flex;
justify-content : center;
border : 2px solid gray;
height : 30px;
border-radius : 10px;
width : 200px;
margin : auto;
padding : 5px;
`



export const Register = () => {

  const dispatch = useDispatch();
 
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
  const nevigate = useNavigate()
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

      const handleSubmit = (event) => {
        event.preventDefault();
        const user = { username, email, password };
        dispatch(signup(user , nevigate));
        };

  return (
    <Container>
        <Title>Sign UP</Title>
        <Form onSubmit={handleSubmit}>
       
        <Label> Name</Label>
        <InputContainer>
        <Input type ='text' placeholder='username'  value={username} onChange={handleNameChange} />
        <Person style={{color : "blue", marginRight : "5px"}}/>
        </InputContainer>

        <Label> Email </Label>
        <InputContainer>
        <Input type='email' placeholder='email'  value={email} onChange={handleEmailChange}/>
        <Email style={{color : "blue" , marginRight : "5px"}}/>
        </InputContainer>

        <Label>Password</Label>
        <InputContainer>
        <Input type ='password' placeholder='password'  value={password} onChange={handlePasswordChange}/>
        <Lock style={{color : "blue" , marginRight : "5px"}} />
        </InputContainer>


       <Button  type='submit'> Register </Button>

        </Form>
        <Redirect>If Aleady have account please <Link href='/login'>Login</Link> </Redirect>
        
    </Container>
  )
}
