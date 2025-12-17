import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ResponsiveAppBar from './pages/Navbar'
import Login from './pages/Login'
import SignupForm from './pages/Signup'
import Signup_header from './components/Signup_header'
import Signup_Footer from './components/Signup_footer'

function App() {
  return (
    <BrowserRouter>
        <Signup_header/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignupForm/>}/>
        </Routes>
        <Signup_Footer/>
    </BrowserRouter>
  )
}

export default App
