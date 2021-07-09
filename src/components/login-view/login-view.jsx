import React, { useState } from 'react';
import './login-view.scss';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //the following const are to set states for form validation
    const [usernameErr, setUsernameErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [userExists, setuserExists] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        // console.log(username, password);
        // props.onLoggedIn(username);
        // props.onRegistered(username);
        axios.post('https://movie-app-alex-offner.herokuapp.com/login', {
            username: username,
            password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log("The user doesn't exist!");
                const userExists = {};
                if (isValid) {
                    userExists.userdoesnotexist = "User doesn't exist. Please check your spelling or register.";
                    setuserExists(userExists);
                } else {
                    delete setuserExists(userExists);
                }

            });
    };



    const formValidation = () => {
        const usernameErr = {};
        const passwordErr = {};

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

        setUsernameErr(usernameErr);
        setPasswordErr(passwordErr);
        return isValid;

    }

    return (
        <Form ref={this.Form} className="centered">
            <h1>myFlix Login</h1>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            {Object.keys(usernameErr).map((key) => {
                return <div key={key} style={{ color: "red" }}>{usernameErr[key]}</div>
            })}
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            {Object.keys(passwordErr).map((key) => {
                return <div key={key} style={{ color: "red" }}>{passwordErr[key]}</div>
            })}
            {Object.keys(userExists).map((key) => {
                return <div key={key} style={{ color: "red" }}>{userExists[key]}</div>
            })}
            <div className="button">
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            <br></br>
            <p>or register here</p>
            <br></br>
            <div className="button">
                <Link to={`/register`}>
                    <Button variant="info">Sign Up</Button>
                </Link>
            </div>
        </Form>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
}
