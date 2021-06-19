import React, { useState } from 'react';
import './registration-view.scss';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistered(username);
        props.onLoggedIn(null);

    };

    const MoveToSignIn = (e) => {
        e.preventDefault();
        console.log('Moving to login');
        props.onLoggedIn(null);
        props.onRegistered(true);
    }

    return (
        <Form className="">
            <h1>myFlix Registration</h1>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Your Birthday:</Form.Label>
                <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <div className="button">
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            <br></br>
            <p>or log in here</p>
            <br></br>
            <div className="button">
                <Button className="button" variant="info" onClick={MoveToSignIn}>Sign Up</Button>
            </div>
        </Form>
    );
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired
};