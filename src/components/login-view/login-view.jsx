import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
        props.onRegistered(username);
    };

    const moveToSignUp = (e) => {
        e.preventDefault();
        console.log('Moving to registration!');
        props.onLoggedIn(true);
        props.onRegistered(null);
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
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <p>or register here</p>
            <button onClick={moveToSignUp}>Sign Up</button>
        </form>
    );
}

LoginView.propTypes = {
    onRegistered: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired
};