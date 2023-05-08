import axios from "axios";
import React, { useEffect, useState , useContext} from "react";
import styled from "styled-components";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import { AuthContext } from "../AuthContext/AuthContexProvider";


import { mobile } from "../responsive";
const Container = styled.div``;
const Wrapper = styled.div`
  border: 2px solid black;
  margin: 5px;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  opacity: ${(props) => props.checkVacant == "booked" && "0.3"};

  ${mobile({ flexDirection : "column"})}
`;
const Left = styled.div``;
const Right = styled.div`
  margin-left: 10%;

`;
const Price = styled.p``;
const Status = styled.span``;
const Image = styled.img`
  border-radius: 20px;
  height: ${(props) => props.data == "booked" && "250px"};

  ${mobile({ width : "99%"})}
`;

const ShowBookedData = styled.p``;

const Booked = styled.span`
  display: flex;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #fff;
  border: 2px solid teal;
  border-radius: 10px;
  cursor: pointer;
`;

export const Rooms = () => {

  const { currentUser  } = useContext(AuthContext)
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];

  const [room, setRoom] = useState([]);

 

  const nevigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(
          `https://hotels-booking-website.vercel.app/api/rooms/hotel/${hotelId}`
        );
        setRoom(response.data.data);
      } catch (err) {
        alert(err);
      }
    };
    getRooms();
  }, []);

  const DeleteBookedRoom = async (e, bookid, roomid) => {
    try {
      const response = await axios.delete(
        `https://hotels-booking-website.vercel.app/api/bookrooms/${bookid}/${roomid}/${hotelId}/${currentUser?._id}`,
        {
          headers: { Authorization: `Barear  ${currentUser?.Token}` },
        }
      );

      if (response) {
        alert(response.data.message);
        nevigate(`/`);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <Container>
      <Navbar />
      {room.map((item, ind) => (
        <Wrapper item={item} key={item._id} checkVacant={item.status}>
          <Left>
            <Image
              data={item.status}
              src={
                "data:image/jpeg;base64,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"
              }
            />
          </Left>
          <Right>
            <Price>
              Room {ind + 1}
              <hr /> Price {item.price} ₹
            </Price>
            <Price>per night</Price>
            {currentUser && item.status == "booked" && (
              <ShowBookedData>
                <Booked>{item.info.cust_name}</Booked>
                <Booked>{item.info.address}</Booked>
                <Booked>{item.info.id_proof}</Booked>
                <Booked>xxxx xxxx {item.info.uid.slice(10)}</Booked>
                <Booked>{item.info.booked_to}</Booked>
                <Booked>{item.info.booked_from}</Booked>
                <Booked>{item.info.booked_at}</Booked>
              </ShowBookedData>
            )}
            <Status> status : {item.status} </Status>
            <hr />
            {currentUser &&
              item.status == "booked" &&
              currentUser?._id == item.info.userId && (
                <ShowBookedData>
                  <Link
                    to={`/roomsbook/update/${hotelId}/${item._id}/${item.info._id}`}
                    style={{ display: "flex", textDecoration: "none" }}
                  >
                    {" "}
                    <Button>Update Booking</Button>
                  </Link>
                  <br />
                  <Button
                    onClick={(e) =>
                      DeleteBookedRoom(e, item.info._id, item._id)
                    }
                    style={{ color: "red" }}
                  >
                    Delete Booking
                  </Button>
                </ShowBookedData>
              )}

            {currentUser && (
              <Link to={`${item._id}`}>
                {item.status !== "booked" && <Button>Book Now</Button>}
              </Link>
            )}
          </Right>
        </Wrapper>
      ))}
      <Footer />
    </Container>
  );
};
