import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Header from './Components/Header/Header'
import Layout from './LayOut'
 import IndexPage from './Pages/indexPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import axios from "axios";
import { UserContextProvider } from './UserContext'
import AccountNav from './Components/Header/AccountNav'
import ProfilePage from './Pages/ProfilePage'
import placePage from './Pages/placePage'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;


function App() {
 

  return (
    <>
     <UserContextProvider>
    <Routes >
    <Route path='/' element={<Layout/>} > 
    <Route path="/home" element={<IndexPage/>}/>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/account" element={<ProfilePage />} />
    <Route path="/account/places" element={<placePage/>} />
    </Route>
    

    </Routes>
    </UserContextProvider>
    </>
  )
}

export default App
