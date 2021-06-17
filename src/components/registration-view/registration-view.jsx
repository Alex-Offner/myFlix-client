import React, { useState } from 'react';
import './registration-view.scss';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onLoggedIn(null);
        props.onRegistered(username);

    };

    const MoveToSignIn = (e) => {
        e.preventDefault();
        console.log('Moving to login');
        props.onLoggedIn(null);
        props.onRegistered(true);
    }

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Register</button>
            <p>or log in here</p>
            <button onClick={MoveToSignIn}>Sign In</button>
        </form >
    );
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired
};