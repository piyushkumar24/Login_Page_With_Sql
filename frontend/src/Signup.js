import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupValidation from './SignupValidation';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = SignupValidation(values);
        setErrors(validationErrors);

        if (
            validationErrors.name === '' &&
            validationErrors.email === '' &&
            validationErrors.password === ''
        ) {
            axios.post('https://sql-login-page-backend.onrender.com/signup', values)
                .then((res) => {
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #000000, #6600cc)' }} className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25 ' style={{ background: 'linear-gradient(to right, #000000, #6600cc)' }}>
                <h2 className='text-white'>Sign-Up</h2>
                <form action=' ' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='text-white'><strong>Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter name'
                            name='name'
                            onChange={handleInput}
                            className='form-control rounded -0'
                        />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='text-white'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleInput}
                            className='form-control rounded -0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='text-white'><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            name='password'
                            onChange={handleInput}
                            className='form-control rounded -0'
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Signup</button>
                    <p className='text-white'>Thereby by signing in, you agree with our terms & policies.</p>
                    <Link
                        to='/'
                        className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
                    >
                        Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
