import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleSendVerificationCode = () => {
        axios
            .post('http://localhost:8081/forgotpassword', { email })
            .then((res) => {
                setMessage(res.data.message);
            })
            .catch((err) => console.log(err));
    };

    const handleResetPassword = () => {
        axios
            .post('http://localhost:8081/resetpassword', { email, verificationCode, newPassword })
            .then((res) => {
                setMessage(res.data.message);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #000000, #6600cc)' }} className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25 ' style={{ background: 'linear-gradient(to right, #000000, #6600cc)' }}>
                <h2 className='text-white'>Forgot Password</h2>
                <p className='text-white'>Enter your email to receive a verification code.</p>
                <div className='mb-3'>
                    <label htmlFor='email' className='text-white'>
                        <strong>Email:</strong>
                    </label>
                    <input type='email' value={email} onChange={handleEmailChange} className='form-control rounded -0'></input>
                </div>
                <button onClick={handleSendVerificationCode} className='btn btn-success w-100 rounded-0'>
                    Send Verification Code
                </button>
                <div className='mb-3'>
                    <label htmlFor='verificationCode' className='text-white'>
                        <strong>Verification Code:</strong>
                    </label>
                    <input type='text' value={verificationCode} onChange={handleVerificationCodeChange} className='form-control rounded -0'></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='newPassword' className='text-white'>
                        <strong>New Password:</strong>
                    </label>
                    <input type='password' value={newPassword} onChange={handleNewPasswordChange} className='form-control rounded -0'></input>
                </div>
                <button onClick={handleResetPassword} className='btn btn-success w-100 rounded-0'>
                    Reset Password
                </button>
                <p className='text-white'>{message}</p>
            </div>
        </div>
    );
}

export default ForgotPassword;
