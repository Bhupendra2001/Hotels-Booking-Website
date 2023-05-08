import styled from "styled-components";
import { Search } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useState , useContext } from "react";
import axios from "axios";

import { AuthContext} from '../AuthContext/AuthContexProvider'
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  padding: 0px 10px 0px 10px;
  background-color: black;
  color: #fff;
  height: 70px;
  align-items: center;
`;
const Left = styled.div`
  display: flex;
  background-color: #fff;
  margin-left: 10px;
  ${mobile({ width: "40%" , fontSize : "5px" })}
`;

const Middle = styled.div`
  ${mobile({ fontSize: "11px" , marginLeft : "5%" })}
`;
const Right = styled.div`

${mobile({ marginLeft : "7%"})}
`;

const Input = styled.input`
  border: none;
  text-style: none;
  outline: none;
  ${mobile({ width: "75%" , fontSize : "10px" })}
`;
const Link = styled.a`
  margin: 10px;
  text-decoration: none;

  color: #fff;
  ${mobile({ display: "none" })}
`;
const Button = styled.button`
  background-color: black;
  color: #fff;

  ${mobile({ display: "none" })}
`;

export const Navbar = ({ onQuery }) => {
 
  let [searchLoc, setSearchLoc] = useState("");
 

  const { currentUser , logout } = useContext(AuthContext)
  
  const SearchLocation = function (location) {
    axios
      .get(`http://localhost:3005/api/hotels`)
      .then((res) => {
        let filterdata = res.data.data.filter(
          (item) =>
            item.title.includes(location.toLowerCase()) ||
            item.city.toLowerCase().includes(location.toLowerCase())
        );
        onQuery(filterdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOutHander = () => {
    logout()
  };

  return (
    <Container>
      <Left>
        <Input
          type="text"
          placeholder="Search hotel"
          onChange={(e) => {
            setSearchLoc(e.target.value);
          }}
        />
        <Search
          onClick={() => {
            SearchLocation(searchLoc);
          }}
          style={{ color: "black" }}
        />
      </Left>
      <Middle> Indians Top Hotels</Middle>
      <Right>
        {!currentUser && <Link href="/login">Login</Link>}
        {!currentUser && <Link href="/register">Register</Link>}
        {currentUser && (
          <Link onClick={logOutHander} href="/login">
            Logout
          </Link>
        )}
        {currentUser && <Button> {currentUser?.username} </Button>}
        <Link href="/">Home</Link>
       
      </Right>
     
    </Container>
  );
};
