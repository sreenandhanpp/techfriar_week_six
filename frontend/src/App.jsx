import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import VerifyPhone from './pages/VerifyPhone/VerifyPhone';
import VerifyAadhar from './pages/VerifyAadhar/VerifyAadhar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import SendEmailOtp from './pages/SendEmailOtp/SendEmailOtp';
import SendPhoneOtp from './pages/SendPhoneOtp/SendPhoneOtp';


function App() {

  return (
    <>
      <Routes>
        <Route exact path='/send-email' element={<SendEmailOtp />} />
        <Route exact path='/send-phone' element={<SendPhoneOtp />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/verify-email' element={<VerifyEmail />} />
        <Route exact path='/verify-phone' element={<VerifyPhone />} />
        <Route exact path='/verify-aadhar' element={<VerifyAadhar />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
