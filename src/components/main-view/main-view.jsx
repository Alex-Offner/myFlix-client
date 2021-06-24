import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { Row, Col, Container, Button, Navbar, Nav } from 'react-bootstrap';
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
            selectedMovie: null,
            user: null
            /* registered: true */
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
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


    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

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

    /*     onRegistered(registered) {
            this.setState({
                registered
            })
        } */

    render() {
        //object destruction for const movies = this.state.movies
        const { movies, selectedMovie, user, registered } = this.state;

        /*         if (!user) return (
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegistered={registered => this.onRegistered(registered)} />
                        </Col>
                    </Row>
                );
        
                if (!registered) return (
                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <RegistrationView onRegistered={registered => this.onRegistered(registered)} onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                    </Row>
                ); */

        /*         if (movies.length === 0) return (
                    <Row className="main-view justify-content-md-center">
                        <div className="main-view" />
                    </Row>
                ); */

        return (
            <Router>

                <Navbar fixed="top" bg="primary" variant="dark">
                    <Navbar.Brand href="/">MyFlix</Navbar.Brand>
                    <Nav className="ml-auto">
                        {user && <Nav.Link href="/">Movies</Nav.Link>}
                        {user && <Nav.Link href="/user">User account</Nav.Link>}
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
                    <Button className="Logout-Button" variant="info" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                </Row>
            </Router >
        )

        /*         return (
                    <Row className="main-view justify-content-md-center">
                        {selectedMovie
                            ? (
                                <Col md={10}>
                                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            )
                            : movies.map(movie => (
                                <Col md={4} key={movie._id}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                                </Col>
                            ))
                        }
                        <Button className="Logout-Button" variant="info" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                    </Row>
                ); */
    }
}


//allows to export a default value, but only one is possible in the application
export default MainView;