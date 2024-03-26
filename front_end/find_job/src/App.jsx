import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import REGISTER from './page/REGISTER'
import Login from './page/Login'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
     <Route path='/' element={<REGISTER/>}> </Route>
     <Route path="/login" element={<Login/>} />
     </Routes>
     </Router>
    </>
  )
}

export default App
