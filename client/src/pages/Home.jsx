import React ,{useState} from 'react'
import styled from 'styled-components'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { Hotels } from '../components/Hotels'
const Container = styled.div``
export const Home = () => {
  const [query,setQuery]=useState([])
  return (
    <Container>
     <Navbar onQuery={setQuery}/>
     <Hotels query={query}/>
     <Footer/>
    </Container>
  )
}
