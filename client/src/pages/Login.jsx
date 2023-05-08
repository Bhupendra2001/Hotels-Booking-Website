import { useState ,useContext} from "react";
import styled from "styled-components";
import { Email, Lock } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../Authentication/userActions";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContexProvider";
const Container = styled.div`
  border: 2px solid red;
  margin: auto;
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10%;
  border-radius: 20px;
`;
const Title = styled.h1`
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 10px;

  border-bottom: 2px solid black;

  text-align: center;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid gray;
  height: 30px;
  border-radius: 10px;
  width: 200px;
  margin: auto;
  padding: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 20px;
  width: 200px;
  margin: auto;
  border: 2px solid blue;
  margin-bottom: 10px;
  border-radius: 10px;
  outline: none;
  border: none;
`;

const Label = styled.label`
  color: blue;
  font-size: 25px;
  margin: auto;
`;

const Button = styled.button`
  color: green;
  border: 2px solid black;
  width: 217px;
  margin: auto;
  margin-top: 20px;

  border-radius: 10px;
  background-color: #fff;
  padding: 3px;
  font-size: 30px;
  text-align: center;
  &:hover {
    color: red;
    border: 2px solid blue;
  }
`;
const Redirect = styled.p`
  text-align: center;
`;
const Link = styled.a`
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
`;

export const Login = () => {
 
  const { loginUser } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(email, password);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, password };
   await loginUser(user);
    dispatch(login(user, navigate));
  };

  return (
    <Container>
      <Title>Sign IN</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Email</Label>
        <InputContainer>
          <Input
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <Email style={{ color: "blue", marginRight: "5px" }} />
        </InputContainer>

        <Label>Password</Label>
        <InputContainer>
          <Input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <Lock style={{ color: "blue", marginRight: "5px" }} />
        </InputContainer>

        <Button type="submit"> Login </Button>
      </Form>
      <Redirect>
        If Don't have account please <Link href="/register">Register</Link>{" "}
      </Redirect>
    </Container>
  );
};
