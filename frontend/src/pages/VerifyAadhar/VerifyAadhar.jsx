import React, { useEffect, useState } from 'react';
import { getItem } from '../../../localStorage/getItem';
import { setItem } from '../../../localStorage/setItem';
import axios from 'axios';
import SendOtp from '../../components/SendOtp/SendOtp';
import { URL } from '../../utils/url';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../redux/constants/user';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { maskAadhar } from '../../utils/maskAadhar';


const SendEmailOtp = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Taking data from localstorage useing getItem function
  const userData = getItem('user');

  //getting state from global state
  const { loading } = useSelector(state => state.aadharData);

  // Use the useEffect hook to process user email data and generate a masked email message.
  useEffect(() => {
    let maskedAadhar = maskAadhar(userData.aadhar);
    let text = `Click the send button to verify your aadhar no: ${maskedAadhar}`;
    setMsg(text);
  }, []);

  // Handle a user's request to send an email OTP (One-Time Password).
  const HandleRequest = (e) => {
    e.preventDefault();
    try {
      // Dispatch an action to indicate the request is in progress
      dispatch({ type: USER.AADHAR_VERIFY_REQUEST });

      // Send a POST request to the server to send an email OTP
      axios.post(URL + '/validate-aadhar', {
        aadhar: userData.aadhar
      }).then(res => {
        if (res.status == 200) {
          // Display a success message to the user
          toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_CENTER
          });
          userData.verified = true;
          setItem('user', userData);
          // Dispatch an action to indicate a successful email OTP send
          dispatch({ type: USER.AADHAR_VERIFY_SUCCESS });

          // Redirecting to verify email page using useNavigate hook
          navigate('/');
        }
      }).catch(err => {

        // Dispatch an action to indicate a failed email OTP send
        dispatch({ type: USER.AADHAR_VERIFY_FAILED });

        // Display an error message to the user
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });

      });
    } catch (error) {
      // Dispatch an action to indicate a failed email OTP send
      dispatch({ type: USER.AADHAR_VERIFY_FAILED });

      // Display a generic error message to the user
      toast.error("Somthing went wrong", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }
  return (
    loading ?
      <Loader />
      :
      <div>
        <SendOtp msg={msg} HandleAction={HandleRequest} color={'green'} />
      </div>
  )
}

export default SendEmailOtp