import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
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
        </div>
    );
}

export default Home;