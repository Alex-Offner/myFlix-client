import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <Form className="centered">
            <h1>myFlix Login</h1>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <div className="button">
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            <br></br>
            <p>or register here</p>
            <br></br>
            <div className="button">
                <Button className="button" variant="info" onClick={moveToSignUp}>Sign Up</Button>
            </div>
        </Form>
    );
}

LoginView.propTypes = {
    onRegistered: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired
};