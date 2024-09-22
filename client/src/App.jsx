import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Header from './Components/Header/Header'
import Layout from './LayOut'
 import IndexPage from './Pages/indexPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import axios from "axios";


function App() {
 

  return (
    <>
    <Routes >
    <Route path='/' element={<Layout/>} > 
    <Route path="/home" element={<IndexPage/>}/>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage/>} />
    </Route>
    

    </Routes>
      
    </>
  )
}

export default App
