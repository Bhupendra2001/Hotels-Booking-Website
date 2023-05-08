//import { Label } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate , useParams } from "react-router-dom";
import { Navbar } from "./Navbar";

const Container = styled.div`
border : 2px solid teal;
height : 450px;
 width : 500px;
 margin :auto;
 margin-top : 50px;
`;

const Form = styled.form`
width : 300px;
border : 2px solid red;
margin : auto;
height : 240px;
display : flex;
flex-direction : column;
padding 20px;
gap : 10px;
margin-top : 50px;
`;

const Input = styled.input`

width : 150px;
color : teal;
border : none;

border-bottom : 2px solid teal;

padding : 2px;
outline : none;
`;

const Label = styled.label`
color : teal;

`;

const Select = styled.select`
width : 155px;
height : 24px;
color : teal;
border : none;
outline : none;
border-bottom : 2px solid teal;
`;

const Option = styled.option``;

const Button = styled.button`
background-color : #fff;
padding : 5px;
width : 200px;
margin : auto;
border-radius : 10px;
color : green;

&:hover{
  border : 2px solid blue;
}
`;

const InputContainer = styled.div` 
display : flex;
justify-content : space-between;
`;

const Title = styled.h2`
color : teal;
text-align : center;
`
const HorizontalLine = styled.hr``


const RoomBookUpdate = () => {
  const [custName, setCustName] = useState("");
  const [address, setAddress] = useState("");
  const [idProof, setIdProof] = useState("aadhar");
  const [uid, setUid] = useState("");
  const [bookedFrom, setBookedFrom] = useState("");
  const [bookedTo, setBookedTo] = useState("");

  // console.log(custName , address , idProof , uid , bookedFrom , bookedTo)
  const navigate = useNavigate()
  const {hotelId , roomId , bookedId} = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("custName" , custName)
    formData.append("address" , address)
    formData.append("idProof" , idProof)
    formData.append("uid" , uid)
    formData.append("bookedFrom" , bookedFrom)
    formData.append("bookedTo" , bookedTo)
   
    try{
        let response = await axios.put(`http://localhost:3005/api/bookrooms/${bookedId}/${roomId}`,formData , {
          headers : {
            "Content-Type": "multipart/form-data",
          }
        } )
      if(response) {
        alert(response.data.message)
       navigate(`/rooms/${hotelId}`)
      }
    }catch(err){
        alert(err.response.data.message)
    }
   
  };

  return (
    <div>
      <Navbar/>
    <Container>
      <Title>Update Booked Data</Title>
      <HorizontalLine/>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label >Customer Name</Label>
          <Input
            placeholder="Enter Name"
            type="text"
            id="custName"
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label >Address</Label>
          <Input

           placeholder="Enter Address"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
        <Label > ID Proof</Label>
        <Select  id="idProof"
            value={idProof}
            onChange={(e) => setIdProof(e.target.value)}>
            <Option  value="aadhar"> Aadhar</Option>
            <Option value="voter_id">Voter ID</Option>
            <Option value="pan_card"> PAN Card</Option>
        </Select>
          
        </InputContainer>

        <InputContainer>
          <Label >UID</Label>
          <Input
          placeholder="Enter UID"
            type="text"
            id="uid"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Label >Booked From</Label>
          <Input
            type="date"
            id="bookedFrom"
            value={bookedFrom}
            onChange={(e) => setBookedFrom(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Label>Booked To</Label>
          <Input
        
            type="date"
            id="bookedTo"
            value={bookedTo}
            onChange={(e) => setBookedTo(e.target.value)}
          />
        </InputContainer>

        <Button type="submit"> Update </Button>
      </Form>
    </Container>
    </div>
  );
};

export default RoomBookUpdate;
