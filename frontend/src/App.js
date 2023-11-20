import React from 'react';
import Login from './Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './Signup'
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';


function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
                <Route path='/signup' element={<Signup />} />
                <Route path='/home' element={<Home />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
