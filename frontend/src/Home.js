import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Home({ email }) {
    const handleChangePassword = () => {
        const currentPassword = prompt("Enter your current password:");
        if (currentPassword) {
            const newPasswordInput = prompt("Enter your new password:");
            if (newPasswordInput) {
                axios.post('http://localhost:8081/changepassword', {
    email: email,
    currentPassword: currentPassword,
    newPassword: newPasswordInput
})
.then((res) => {
    alert(res.data.message);
})
.catch((err) => console.log(err));
            }
        }
    };

    return (
        <div style={{ backgroundColor: 'skyblue', minHeight: '100vh', overflow: 'hidden' }}>
        <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2 text-center" style={{ background: 'linear-gradient(to right, #000000, #6600cc)', padding: '20px', borderRadius: '10px', color: 'white', width: '80%', margin: 'auto', minHeight: '300px' }}>
                        <h1 className="display-4">WELCOME, YOU ARE LOGGED IN!</h1>
                        <p className="lead">Enjoy your day!</p>
                    </div>
                </div>
            </div>
            <button className="btn btn-info" onClick={handleChangePassword}>Change Password</button>
        </div>
    );
}

export default Home;
