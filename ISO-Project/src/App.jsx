import './Styles/App.css'
import {Routes, Route, Link} from "react-router-dom"
import Welcome from './Pages/Welcome'
import Login from './Pages/Login'
import Register from './Pages/Register'
import RecuperatePwrd from './Pages/RecuperatePassword'
import { Popup } from './components/Popup'

function App() {

  return (
    <>
    <Routes>
      <Route path = "/" element = {<Welcome/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path = "/Register" element={<Register/>}/>
      <Route path = "/RecuperatePassword" element={<RecuperatePwrd/>}/>
      <Route path = "/Popup" element = {<Popup/>} />
    </Routes>
    </>
  )
}

export default App
