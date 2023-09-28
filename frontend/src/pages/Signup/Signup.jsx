import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import InuptField from '../../components/InuptField/InuptField';
import { useNavigate } from "react-router-dom";
import { URL } from '../../url';
import { USER } from '../../redux/constants/user';
import './style.css';
import Loader from '../../components/Loader/Loader';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.userData);

  // useEffect(() => {
  //   const nameRegex = /^[A-Za-z\s]+$/; // Allows letters and spaces only
  //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Basic email format validation
  //   const phoneRegex = /^\d{10}$/; // 10-digit phone number
  //   const aadharRegex = /^\d{12}$/; // 12-digit Aadhar number
  //   const error = {};
  //   if (!name) {
  //     error.name = 'Full Name is required';
  //   } else if (!nameRegex.test(name)) {
  //     error.name = 'Invalid name. Please use only letters and spaces.';
  //   }

  //   if (!email) {
  //     error.email = 'Email is required';
  //   } else if (!emailRegex.test(email)) {
  //     error.email = 'Invalid email address.';
  //   }

  //   if (!phone) {
  //     error.phone = 'Phone number is required';
  //   } else if (!phoneRegex.test(phone)) {
  //     error.phone = 'Invalid phone number. Please enter 10 digits.';
  //   }

  //   if (!aadhar) {
  //     error.aadhar = 'Aadhar number is required'
  //   } else if (!aadharRegex.test(aadhar)) {
  //     error.aadhar = 'Invalid Aadhar number. Please enter 12 digits.';
  //   }

  // }, [name, email, phone, aadhar, dob]);

  /**
 * Handle User Signup
 * 
 * This function is responsible for processing user signup requests. It is triggered when a user submits a signup form.
 * 
 * Steps:
 * 1. Prevents the default form submission behavior to handle the request via AJAX.
 * 2. Dispatches a signup request action to indicate that the signup process has started.
 * 3. Sends a POST request to a specified URL (likely a server endpoint) with user data including name, email, date of birth (DOB), phone number, and Aadhar number.
 * 4. Upon successful response (HTTP status 200), it parses the response data (presumably containing user information) and dispatches a signup success action.
 * 5. It also navigates the user to a 'verify-email' page (for email verification) while replacing the current URL in the browser history.
 * 6. If there's an error during the API request, it dispatches a signup failed action and logs the error to the console.
 * 7. Any exceptions outside the try-catch block are also caught and logged.
 * 
 * The event object, typically a form submission event.
 */
  const HandleSignup = (e) => {
    e.preventDefault();
    try {
      dispatch({ type: USER.SIGNUP_REQUEST });
      axios.post(URL + '/signup', {
        name: name,
        email: email,
        dob: dob,
        phone: phone,
        aadhar: aadhar
      }).then(res => {
        if (res.status == 200) {
          let data = JSON.parse(res.data);
          dispatch({ type: USER.SIGNUP_SUCCESS, payload: data });
          navigate('/verify-email', { replace: true })
        }
      }).catch(err => {
        dispatch({ type: USER.SIGNUP_FAILED, payload: err });
        console.log(err);
      })
    } catch (error) {
      dispatch({ type: USER.SIGNUP_FAILED, payload: err });
      console.log(err);
    }
  }

  return (
    loading ?
      <Loader />
      :
      <div>
        <section className="container">
          <header>Registration Form</header>
          <form className="form" action="#">
            <InuptField placeholder={"Enter your name"} type={"text"} label={"Full Name"} setData={setName} />
            <div className="column">
              <InuptField placeholder={"Enter your phone"} type={"text"} label={"Phone Number"} setData={setPhone} />
              <InuptField placeholder={"Enter birth data"} type={"date"} label={"Date of Birth"} setData={setDob} />
            </div>
            <InuptField placeholder={"Enter your email"} type={"text"} label={"Email"} setData={setEmail} />
            <InuptField placeholder={"Enter Aadhar number"} type={"text"} label={"Aadhar number"} setData={setAadhar} />
            <button onClick={e => HandleSignup(e)}>Submit</button>
          </form>
        </section>
      </div>
  )
}

export default Signup