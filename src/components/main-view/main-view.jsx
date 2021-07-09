import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';


import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { Row, Col, Navbar, Nav, Form } from 'react-bootstrap';
/* import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'; */

import './main-view.scss';

export class MainView extends React.Component {

    //create a component in memory before rendering. Even if not included react will add a constructer method. 
    constructor() {

        //super calls constructor on parent class (in this case "React.Component")
        super();
        this.state = {
            /* user: null, */
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
            this.getUser(accessToken);
            /*             this.getUser(accessToken); */
        }
    }

    getMovies(token) {
        axios.get('https://movie-app-alex-offner.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
                /* console.log(response.data) */
                /*             this.setState({
                                                    movies: response.data
                            }); */
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUser(token) {
        axios.get('https://movie-app-alex-offner.herokuapp.com/users/' + localStorage.getItem('user'), {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setUser(response.data);
                /* console.log(response.data) */
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.props.setUser(authData.user);
        /*    this.setState({
               user: authData.user.username
           }); */

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
        this.props.getUser(authData.user);
        window.open(`/movies`, '_self');
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUser(null);
        window.open(`/`, '_self');
        /*         this.setState({
                    user: null
                }); */
    }

    render() {
        //object destruction for const movies = this.state.movies
        const { token } = this.state;
        let { movies, visibilityFilter, user } = this.props;


        return (
            <Router>

                <Navbar fixed="top" bg="primary" variant="dark">
                    <Navbar.Brand href="/">MyFlix</Navbar.Brand>
                    <Nav className="ml-auto">
                        {user.username ? (
                            <Form className="form-inline my-2 my-lg-0">
                                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
                            </Form>) : null
                        }
                        {user.username ? (<Nav.Link href="/">Movies</Nav.Link>) : null}
                        {user.username ? (<Nav.Link href={`/users/${user.username}`}>User profile</Nav.Link>) : null}
                        {!user.username && <Nav.Link href="/register">Register</Nav.Link>}
                        {!user.username ?
                            <Nav.Link href="/">Log in</Nav.Link> :
                            <Nav.Link href="#logout" onClick={() => this.onLoggedOut(null)}>Sign out</Nav.Link>}
                    </Nav>
                </Navbar>

                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (user === null || user.length <= 0) return <Col md={5}>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0 || movies === null) return (
                            <div className="main-view" />
                        )
                        return <MoviesList movies={movies} />;
                    }} />

                    <Route path="/register" render={() => {
                        if (user.username) return <Redirect to="/" />
                        return <Col md={5}>
                            <RegistrationView />
                        </Col>
                    }} />
                    <Route exact path="/movies/:movieId" render={({ match, history }) => {
                        if (!user.username) return <Col>
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
                        if (!user.username) return <Col>
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
                        if (!user.username) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return (
                            <div className="main-view" />
                        )
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path={`/users/${user.username}`} render={({ history }) => {
                        if (!user.username) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return (
                            <Col md={8}>
                                <ProfileView user={user} token={token} movies={movies} onLoggedIn={user => this.onLoggedIn(user)} onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />
                </Row>
            </Router >
        )
    }
}

let mapStateToProps = state => {
    const { visibilityFilter } = state;
    return {
        movies: state.movies,
        user: state.user,
        visibilityFilter
    }
}


//allows to export a default value, but only one is possible in the application
export default connect(mapStateToProps, { setMovies, setUser })(MainView);