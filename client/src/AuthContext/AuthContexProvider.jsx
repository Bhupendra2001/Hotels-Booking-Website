import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()


export const AuthContexProvider = ({children})=>{
    const [currentUser , setCurrentUser] = useState(JSON.parse(localStorage.getItem("User") || null))

    const loginUser = async(inputs)=>{
        const res = await axios.post("https://hotels-booking-website.vercel.app/api/login", inputs)
      
        setCurrentUser(res.data.data)
    };

    const logout = async(inputs)=>{
   
        setCurrentUser(null)
        localStorage.clear()
    };

    useEffect(()=> {
        localStorage.setItem("User" , JSON.stringify(currentUser))
    },[currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, loginUser, logout}}>
       {children}
        </AuthContext.Provider>
    )
} 