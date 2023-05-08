import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Rating } from "@mui/material";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: auto;
  ${mobile({ margin: "0px" })}
`;

const Wrapper = styled.div`
  display: flex;
  border: 2px solid gray;
  justify-content: space-between;
  margin: 20px;
  height: auto;
  width: auto;

  ${mobile({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "10px",
    margin: "5px",
  })}
`;

const Right = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Left = styled.div``;

const Image = styled.img`
  height: 98%;
  width: 300px;
  border: 4px solid black;
  border-radius: 20px;

  ${mobile({ width: "98%", height : "380px", border: "4px solid black", borderRadius: "10px" })}
`;

const Facilities = styled.div`
  display: flex;
  flex: wrap;
  gap: 10px;
  color: red;
`;

const FacilitiesItems = styled.p`
  font-size: 12px;
`;

const Title = styled.h1`
  font-size: 20px;
  ${mobile({ fontSize: "14px", flex: "wrap" })}
`;
const NewLine = styled.br``;

const City = styled.p``;

const Address = styled.span`
  margin-bottom: 10px;
`;

const FilterContainer = styled.div`
  width: auto;
  height: auto;
  margin: auto;
  display: flex;
  margin: 0px 20px 0px 20px;
  justify-content: space-between;

  ${mobile({  marginLeft : "7px"})}
`;
const FilterWrapper = styled.div`
  border: 2px solid red;
  display: flex;
  justify-content: space-between;
  padding: 0px 8px 0px 8px;
  margin-left: 10px;
  height: 60px;
  align-items: center;


  ${mobile({ flexDirection : "column", width : "80%" , height : "240px" , margin : "5%" , paddingLeft : "3px",})}
`;

const ShowFilter = styled.button`
  color: green;
  background-color: #fff;
  border: 2px solid teal;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  ${ mobile({ width : "24%" , marginLeft : "0px" })}
`;
const FilterLabel = styled.label`
  font-size: 20px;
   color: teal;
   width : 20%;
  ${mobile({ fontSize : "25px" , marginBottom :"2%"  })}
`;

const FilterSelect = styled.select`
  margin : 2%;
  margin-left : 0px;
  outline: none;
  width: 18%;
  height: 50%;
  color: teal;
  ${ mobile({ width : "80%"  , height : "20%"})}
`;
const FilterOption = styled.option`


`;


const FilterApply = styled.button`
  margin: auto;
  border: 2px solid gray;
  background-color: #fff;
  padding: 4px;
  color: teal;
  font-size: 15px;
  ${mobile({ fontSize : "20px", width : "80%" , marginBottom : "4%"})}
`;

const Checkroom = styled.button`
border : none;
background : #fff;


`
const RoomAvailable = styled.p``;

const Link = styled.a`
text-decoration: none;
border: 1px solid red;
padding: 10px;
width : 110px;
margin-bottom: 10px;
`

export const Hotels = ({ query }) => {
  const [hotels, setHotels] = useState([]);

  
  const [showfilter, setShowfilter] = useState(false);
  const [filters, setFilters] = useState({
    star: "5",
    facilities: "balcony",
  });

  const onStarChange = (event) => {
    setFilters({ ...filters, star: event.target.value });
  };

  const onFacChange = (event) => {
    setFilters({ ...filters, facilities: event.target.value });
  };

  const Applyapl = async (filters) => {
    let { star, facilities } = filters;

    let data = await axios.get(
      `https://hotels-booking-website.vercel.app/api/hotels?stars=${parseInt(
        star
      )}&facilities=${facilities}`
    );
    setHotels(data.data.data);
  };

  useEffect(() => {
    const getHotels = () => {
      if (query.length == 0) {
        axios
          .get("https://hotels-booking-website.vercel.app/api/hotels")
          .then((response) => {
            setHotels(response.data.data);
          })
          .catch((err) => console.log(err));
      } else {
        setHotels(query);
      }
    };
    getHotels();
  }, [query]);

  return (
    <Container>
      <div>
        <FilterContainer>
          <ShowFilter onClick={() => setShowfilter(!showfilter)}>
            Filters
          </ShowFilter>
          {showfilter == true && (
            <FilterWrapper>
              <FilterLabel>Rating :</FilterLabel>
              <FilterSelect onChange={onStarChange}>
                <FilterOption value={"5"}>5 star </FilterOption>
                <FilterOption value={"4"}>4 star </FilterOption>
                <FilterOption value={"3"}>3 star </FilterOption>
                <FilterOption value={"2"}>2 star </FilterOption>
                <FilterOption value={"1"}>1 star </FilterOption>
              </FilterSelect>

              <FilterLabel>Facility :</FilterLabel>

              <FilterSelect onChange={onFacChange}>
                <FilterOption value={"balcony"}>balcony </FilterOption>
                <FilterOption value={"city view"}>city view </FilterOption>
                <FilterOption value={"air condtioning"}>
                  air condtioning{" "}
                </FilterOption>
                <FilterOption value={"private entrance"}>
                  private entrance{" "}
                </FilterOption>
                <FilterOption value={"ensult bathroom"}>
                  ensult bathroom{" "}
                </FilterOption>
                <FilterOption value={"free wifi"}>free wifi </FilterOption>
                <FilterOption value={"outdoor swimming pool"}>
                  outdoor swimming pool{" "}
                </FilterOption>
                <FilterOption value={"free parking"}>
                  free parking{" "}
                </FilterOption>
              </FilterSelect>

              <p>{console.log(filters)}</p>
              <FilterApply onClick={() => Applyapl({ ...filters })}>
                Apply
              </FilterApply>
            </FilterWrapper>
          )}
        </FilterContainer>
      </div>
      {hotels.map((item) => (
        <Wrapper item={item} key={item._id}>
          <Left>
            <Image src={item.hotel_img} />
          </Left>
          <Right>
            <Title> {item.title}</Title>

            <City>{item.city}</City>
            <Address>{item.address}</Address>
            <NewLine />
            <NewLine />

            <Rating
              name="simple-controlled"
              value={item.stars}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />

            <Facilities>
              {item.facilities.map((face) => (
                <FacilitiesItems item={face} key={face}>
                  {face}
                </FacilitiesItems>
              ))}
            </Facilities>
            <NewLine />
            <RoomAvailable>
              Room Available :{item.roomsAvailableCount}
            </RoomAvailable>
            <NewLine />

            <Link
             
              href={`/rooms/${item._id}`}

              
            >
              <Checkroom>Check Rooms</Checkroom>
              
            </Link>
          </Right>
        </Wrapper>
      ))}
    </Container>
  );
};
