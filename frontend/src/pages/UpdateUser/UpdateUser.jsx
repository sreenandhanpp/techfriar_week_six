import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import InuptField from '../../components/InuptField/InuptField';
import { useNavigate } from "react-router-dom";
import { URL } from '../../url';
import { USER } from '../../redux/constants/user';
import './style.css';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { getItem } from '../../../localStorage/getItem';


const UpdateUser = () => {
    const [isExist, setIsExist] = useState({
        email: '',
        aadhar: '',
        phone: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        dob: '',
        phone: '',
        aadhar: ''
    });
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        dob: '',
        phone: '',
        aadhar: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.updatedData);
    const userData = getItem('user');

    const ErrorHandler = () => {

        // Regular expressions for various form field validations
        const nameRegex = /^[A-Za-z\s]+$/; // Allows letters and spaces only
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Basic email format validation
        const phoneRegex = /^\d{10}$/; // 10-digit phone number
        const aadharRegex = /^\d{12}$/; // 12-digit Aadhar number

        // Initialize an empty error object
        const error = {};

        // Validate Date of Birth
        if (!formValues.dob) {
            error.dob = 'Date of Birth requried';
        }

        // Update the errors state for Date of Birth
        setErrors((prev) => {
            return {
                ...prev, dob: error.dob
            }
        });

        // Validate Full Name
        if (!formValues.name) {
            error.name = 'Full Name is required';
        } else if (!nameRegex.test(formValues.name)) {
            error.name = 'Invalid name. Please use only letters and spaces.';
        }

        // Update the errors state for Full Name
        setErrors((prev) => {
            return {
                ...prev, name: error.name
            }
        });

        // Validate Email
        if (!formValues.email) {
            error.email = 'Email is required';
        } else if (!emailRegex.test(formValues.email)) {
            error.email = 'Invalid email address.';
        }

        // Update the errors state for Email
        setErrors((prev) => {
            return {
                ...prev, email: error.email
            }
        });

        // Validate Phone Number
        if (!formValues.phone) {
            error.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formValues.phone)) {
            error.phone = 'Invalid phone number. Please enter 10 digits.';
        }

        // Update the errors state for Phone Number
        setErrors((prev) => {
            return {
                ...prev, phone: error.phone
            }
        });

        // Validate Aadhar Number
        if (!formValues.aadhar) {
            error.aadhar = 'Aadhar number is required'
        } else if (!aadharRegex.test(formValues.aadhar)) {
            error.aadhar = 'Invalid Aadhar number. Please enter 12 digits.';
        }

        // Update the errors state for Aadhar Number
        setErrors((prev) => {
            return {
                ...prev, aadhar: error.aadhar
            }
        });

        // Return the error object with error messages
        return error;
    }

    // Takes an error array and searches for a specific error message based on the provided criteria.
    const HandleErrorStructure = (find, error) => {
        // Initialize an array to store matching error messages
        const value = error.map((value => {
            if (value.path == find) {
                return value.msg;// Return the error message if 'path' matches the criteria
            }
            // Return undefined if 'path' doesn't match to keep only matching values
        }));
        return value; // Return an array of matching error messages
    }


    const HandleUpdate = (e) => {
        e.preventDefault();
        const error = ErrorHandler();
        const isErr = Object.getOwnPropertyNames(error).length

        if (isErr == 0) {
            try {
                dispatch({ type: USER.UPDATE_USER_REQUEST });
                axios.post(URL + '/update', {
                    id: userData.id,
                    name: formValues.name,
                    email: formValues.email,
                    dob: formValues.dob,
                    phone: formValues.phone,
                    aadhar: formValues.aadhar
                }).then(res => {
                    if (res.status == 200) {
                        let data = JSON.parse(res.data);
                        dispatch({ type: USER.UPDATE_USER_SUCCESS, payload: data });

                        toast.success("Account details updated", {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                        navigate('/send-email', { replace: true })
                    }
                }).catch(err => {

                    const error = err.response.data.error;
                    setErrors((prev) => {
                        return {
                            ...prev,
                            phone: HandleErrorStructure('phone', error),
                            aadhar: HandleErrorStructure('aadhar', error),
                            email: HandleErrorStructure('email', error)
                        }
                    });
                    dispatch({ type: USER.UPDATE_USER_FAILED });
                })
            } catch (err) {
                dispatch({ type: USER.UPDATE_USER_FAILED });
            }
        }
    }

    const resetError = (e) => {
        setErrors(prev => {
            return { ...prev, [e.target.name]: '' }
        });
    }

    // Handle changes in input fields by updating the OTP (One-Time Password) state.
    const HandleChange = (e) => {
        resetError(e);

        // Update the form field state using the spread operator to maintain previous values
        setFormValues((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }

    const convertDateFormat = (inputDate) => {
        // Split the input date string into date and zone
        const parts = inputDate.split('T');

        // taking the date 
        const date = parts[0];

        return date;
    }

    useEffect(() => {
        console.log(userData);
        axios.post(URL + '/get-user-details', {
            id: userData.id
        }).then(res => {
            setFormValues((...prev) => {
                return {
                    ...prev,
                    name: res.data.name,
                    phone: res.data.phone,
                    email: res.data.email,
                    aadhar: res.data.aadhar,
                    dob: convertDateFormat(res.data.dob)
                }
            })
        }).catch(err => {
        })
    }, [])
    return (
        loading ?
            <Loader />
            :
            <div className='form-wrapper'>
                <section className="container">
                    <header>Update Details</header>
                    <form className="form">
                        <InuptField
                            placeholder={"Enter your name"}
                            type={"text"} label={"Full Name"}
                            HandleChange={HandleChange}
                            msg={errors.name}
                            name={"name"}
                            value={formValues.name}
                        />
                        <div className="column">
                            <InuptField
                                placeholder={"Enter your phone"}
                                type={"text"} label={"Phone Number"}
                                HandleChange={HandleChange}
                                msg={errors.phone}
                                name={"phone"}
                                value={formValues.phone}
                            />
                            <InuptField
                                placeholder={"Enter birth data"}
                                type={"date"} label={"Date of Birth"}
                                HandleChange={HandleChange}
                                msg={errors.dob}
                                name={"dob"}
                                value={formValues.dob}
                            />
                        </div>
                        <InuptField
                            placeholder={"Enter your email"}
                            type={"text"} label={"Email"}
                            HandleChange={HandleChange}
                            msg={errors.email}
                            name={"email"}
                            value={formValues.email}
                        />
                        <InuptField
                            placeholder={"Enter Aadhar number"}
                            type={"text"} label={"Aadhar number"}
                            HandleChange={HandleChange}
                            msg={errors.aadhar}
                            name={"aadhar"}
                            value={formValues.aadhar}
                        />
                        <button onClick={e => HandleUpdate(e)}>Update</button>
                    </form>
                </section>
            </div>
    )
}

export default UpdateUser