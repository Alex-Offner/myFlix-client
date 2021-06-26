import React, { useState } from 'react';
import './registration-view.scss';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { Link } from "react-router-dom";

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    //the following consts are to set states for form validation
    const [usernameErr, setUsernameErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [emailErr, setEmailErr] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        axios.post('https://movie-app-alex-offner.herokuapp.com/users', {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            })
            .catch(e => {
                console.log('error registering the user')
            });
    };

    const formValidation = () => {
        const usernameErr = {};
        const passwordErr = {};
        const emailErr = {};

        let isValid = true;

        if (username.trim().length < 5) {
            usernameErr.usernameShort = "Username is too short.";
            isValid = false;
        }

        if (!username.match(/^[0-9a-zA-Z]+$/)) {
            usernameErr.usernameNotAlphanumeric = "Username must only include alphanumeric symbols.";
            isValid = false;
        }

        if (password.trim().length === 0) {
            passwordErr.noPassword = "Password is required.";
            isValid = false;
        }

        if (email.trim().length === 0) {
            emailErr.noEmail = "Email is required.";
            isValid = false;
        }

        if (!email.includes("@") || !email.includes(".")) {
            emailErr.noAtSymbol = "Email is not valid.";
            isValid = false;
        }

        /*         if (!email.includes(".")) {
                    emailErr.noDot = "Email is not valid.";
                    isValid = false;
                } */


        setUsernameErr(usernameErr);
        setPasswordErr(passwordErr);
        setEmailErr(emailErr);
        return isValid;
    }

    return (
        <Form className="center-registration">
            <h1>myFlix Registration</h1>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            {Object.keys(usernameErr).map((key) => {
                return <div key={key} style={{ color: "red" }}>{usernameErr[key]}</div>
            })}
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            {Object.keys(passwordErr).map((key) => {
                return <div key={key} style={{ color: "red" }}>{passwordErr[key]}</div>
            })}
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            {Object.keys(emailErr).map((key) => {
                return <div key={key} style={{ color: "red" }}>{emailErr[key]}</div>
            })}
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
                <Link to={`/`}>
                    <Button variant="info">Sign In</Button>
                </Link>
            </div>
        </Form>
    );
}
/*
RegistrationView.propTypes = {
    onRegistered: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired
}; */