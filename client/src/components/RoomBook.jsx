import axios from "axios";
import { useState , useContext} from "react";
import {  useNavigate , useParams} from "react-router-dom";
import styled from "styled-components";
import {mobile , tablet} from '../responsive'
import { AuthContext } from "../AuthContext/AuthContexProvider";
const Container = styled.div`
  border: 2px solid gray;
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 400px;
  border-radius: 10px;
  ${tablet({ width : "80%" })}
  ${mobile({ width : "94%" ,   fontSize : "13px"})}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  gap: 14px;
  height : auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
outline :none;
margin-left : 20px;
width :150px;`;

const Label = styled.label`
  color: teal;
`;

const Title = styled.h1`
  text-align: center;
  color: blue;
`;

const Submit = styled.button`
  border: 2px solid teal;
  background-color: #fff;
  margin :auto;
  padding :5px;
  width : 100px;

  &:hover {
    color : green;
    border : 2px solid blue;
  }
`;

const Select = styled.select`
color : teal;
width :157px;`;

const Option = styled.option``;
const Line = styled.hr`

color : black`

export const RoomBook = () => {

  const {currentUser } = useContext(AuthContext)
  const { hotelId , roomId} = useParams()
  const navigate = useNavigate()
  

  const [booked, setBooked] = useState({
    cust_name: "",
    address: "",
    id_proof: "aadhar",
    uid: "",
    booked_from: null,
    booked_to: null,
  });
   
  const  handleOnChange =  (e)=>{
    setBooked( {...booked ,[e.target.name ]:e.target.value})
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    try{
    let response =  await axios.post(`https://hotels-booking-website.vercel.app/api/bookrooms/rooms/${roomId}/hotel/${hotelId}/${currentUser?._id}` , booked ,
    {
      headers : {
        'Authorization' : `Barear  ${currentUser?.Token}`
      }
    })
    
    if(response) alert("Successfully booked Room")
    navigate(`/rooms/${hotelId}`)
    }catch(err){
     alert(err.response.data.message)
    }

  }
  return (
    <Container>
      <Title>Room Book</Title>
    <Line/>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Label>Costomer Name : </Label>
          <Input type="text" placeholder="cust_name"  value={booked.cust_name} name="cust_name" onChange={handleOnChange}  />
        </Wrapper>

        <Wrapper>
          <Label>Address :</Label>
          <Input type="text" placeholder="Address"  value={booked.address}   name="address" onChange={handleOnChange} />
        </Wrapper>

        <Wrapper>
          <Label>Id Proof :</Label>
          <Select placeholder="select Id" name="id_proof"  onChange={handleOnChange}   >
            <Option value="aadhar">Aadhar Card</Option>
            <Option value="voter_id">VoterId</Option>
            <Option value="pan_card">Pan Card</Option>
          </Select>
        </Wrapper>

        <Wrapper>
          <Label>Enter Your Id :</Label>
          <Input type="text" placeholder="Your Id" value={booked.uid} name="uid" onChange={handleOnChange}  />
        </Wrapper>

        <Wrapper>
          <Label>Booked From :</Label>
          <Input type="date"   name="booked_from" value={booked.booked_from} onChange={handleOnChange} />
        </Wrapper>

        <Wrapper>
          <Label>Booked To :</Label>
          <Input type="date"   name="booked_to" value={booked.booked_to} onChange={handleOnChange} />
        </Wrapper>

        <Submit type="submit">Book Now</Submit>
      </Form>
    </Container>
  );
};
