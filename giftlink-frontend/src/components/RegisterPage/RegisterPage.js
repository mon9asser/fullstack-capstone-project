import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    const handleRegister = async () => {
        const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email, firstName, lastName, password }),
        });
        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', firstName);
            sessionStorage.setItem('email', json.email);
            setIsLoggedIn(true);
            setUserName(firstName);
            navigate('/app');
        }
        if (json.error) {
            setShowerr(json.error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 480 }}>
            <h2>Register</h2>
            <input className="form-control mb-2" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className="form-control mb-2" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="text-danger mb-2">{showerr}</div>
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;
