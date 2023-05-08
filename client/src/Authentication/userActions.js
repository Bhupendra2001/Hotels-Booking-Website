import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

import {
  signupSuccess,
  signupFailure,
  loginSuccess,
  loginFailure,
  logout,
  bookingSuccess,
  bookingFailure
} from './userReducer';

const API_BASE_URL = 'https://hotels-booking-website.vercel.app/api';

export const signup = (user ,nevigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, user);
       if(response) nevigate('/login')
      dispatch(signupSuccess(response.data));
     
    } catch (error) {
      alert(error.response.data.message)
      dispatch(signupFailure(error.response.data));
    }
  };
};

export const login = (user , nevigate) => {
  
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, user);
      if(response) nevigate('/')
     // console.log(response.data.data)
      dispatch(loginSuccess(response.data));
    } catch (error) {
      alert(error.response.data.message)
      dispatch(loginFailure(error.response.data));
    }
  };
};

export const booking = (bookdata , nevigate , hotelId , roomId , ) =>{

  return async (dispatch)=>{
    try{
      const response = await axios.post(`${API_BASE_URL}/bookrooms/rooms/${roomId}/hotel/${hotelId}`)
      if(response) nevigate(`/rooms/${hotelId}`)
      alert("successfully booked room")
    }catch(err){
      alert(err.response.data.message)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};
