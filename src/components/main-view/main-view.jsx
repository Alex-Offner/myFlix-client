import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col, Navbar, Nav } from 'react-bootstrap';
/* import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'; */

import './main-view.scss';

export class MainView extends React.Component {

    //create a component in memory before rendering. Even if not included react will add a constructer method. 
    constructor() {

        //super calls constructor on parent class (in this case "React.Component")
        super();
        this.state = {
            movies: [],
            user: null,
            userData: null,
            token: null,
            users: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
                token: localStorage.getItem('token')
            });
            this.getMovies(accessToken);
            this.getUsers(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://movie-app-alex-offner.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUsers(token, users) {
        axios.get('https://movie-app-alex-offner.herokuapp.com/users/${user}', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /*     getProfile(token) {
            axios.get('https://movie-app-alex-offner.herokuapp.com/users/${user}', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    console.log("Profile loaded!");
                    this.setState({
                        userData: response.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
     */
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    onUserProfile(user) {
        console.log(user);
        this.setState({
            users: authData.user.username
        });
        this.getProfile(user.token, user.username);
    }

    render() {
        //object destruction for const movies = this.state.movies
        const { movies, userData, user, token } = this.state;

        return (
            <Router>

                <Navbar fixed="top" bg="primary" variant="dark">
                    <Navbar.Brand href="/">MyFlix</Navbar.Brand>
                    <Nav className="ml-auto">
                        {user && <Nav.Link href="/">Movies</Nav.Link>}
                        {user && <Nav.Link href="/users/${user}">User profile</Nav.Link>}
                        {!user && <Nav.Link href="register">Register</Nav.Link>}
                        {user === null ?
                            <Nav.Link href="/">Log in</Nav.Link> :
                            <Nav.Link href="#logout" onClick={() => this.onLoggedOut(null)}>Sign out</Nav.Link>}
                    </Nav>
                </Navbar>

                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col md={5}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return (
                            <div className="main-view" />
                        )
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col md={5}>
                            <RegistrationView />
                        </Col>
                    }} />
                    <Route exact path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return (
                            <div className="main-view" />
                        )
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/director/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return (
                            <div className="main-view" />
                        )
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return (
                            <div className="main-view" />
                        )
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/users/${user}" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return (
                            <Col md={8}>
                                <ProfileView user={user} token={token} onLoggedIn={user => this.onLoggedIn(user)} onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />
                </Row>
            </Router >
        )
    }
}


//allows to export a default value, but only one is possible in the application
export default MainView;