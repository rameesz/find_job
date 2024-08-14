import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import REGISTER from './page/REGISTER'
import Login from './page/Login'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Dashboard from './page/Dashboard'
import Applyjob from './page/applyjob'
import CustomerLogin from './page/Customer_login'
import CustomerRegister from './page/CustomerRegister'
import UpdateProfile from './page/UpdateProfile'
import MyProfile from './page/Profile'
import AppliedCustomer from './page/Viewapplications'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
     <Route path='/register' element={<REGISTER/>}> </Route>
     <Route path="/login" element={<Login/>} />
     <Route path='/dashboard' element={<Dashboard/>}/>
     <Route path='/' element={<Applyjob/>}/>
     <Route path='/customer/register' element={<CustomerRegister/>}/>
     <Route path='/customer/login' element={<CustomerLogin/>}/>
     <Route path='/update_profile' element={<UpdateProfile/>}/>
     <Route path='/profile' element={<MyProfile/>}/>
     <Route path='/company/appliedcustomer/:jobId' element={<AppliedCustomer/>}/>





     </Routes>
     </Router>
    </>
  )
}

export default App
