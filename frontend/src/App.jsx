import { useState,useEffect } from 'react'
import Header from "./component/layout/Header/Header.jsx"
import {BrowserRouter as Router} from "react-router-dom"
import WebFont from "webfontloader"
// import './App.css'



function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans"]
      }
    })
  },[])

  return (
    <>
    <Router>
     <Header/>  
    </Router>
    </>
    
  )
}

export default App
