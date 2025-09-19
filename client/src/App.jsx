 import React from 'react'
 import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom' 
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Result from './pages/Result'
 
 const App = () => {
   return (
     <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/feedback' element={<Result />}></Route>
        </Routes>
      </Router>
     </div>
   )
 }
 
 export default App