import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha'; 

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [captchaValue, setCaptchaValue] = useState(null); 

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (validationErrors.email === '' && validationErrors.password === '' && captchaValue) {
            axios
                .post('http://localhost:8081/login', { ...values, captchaValue }) 
                .then((res) => {
                    if (res.data === 'Success') {
                        navigate('/home', { state: { email: values.email } });
                    } else {
                        alert('No record existed');
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert('Please complete the reCAPTCHA verification.');
        }
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #000000, #6600cc)' }} className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25 ' style={{ background: 'linear-gradient(to right, #000000, #6600cc)' }}>
                <h2 className='text-white'>Sign-In</h2>
                <form action=" " onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='text-white'>
                            <strong>Email</strong>
                        </label>
                        <input type='email' placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded -0'></input>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='text-white'>
                            <strong>Password</strong>
                        </label>
                        <input type='password' placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded -0'></input>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <ReCAPTCHA sitekey="6Ld77hQpAAAAAAr-Mr_2UCnZDxahyQWKf2EOv5uF" onChange={handleCaptchaChange} /> 
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Log In
                    </button>
                    <p className='text-white'>Thereby by signing in, you agree with our terms & policies.</p>
                    <Link to="./signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;