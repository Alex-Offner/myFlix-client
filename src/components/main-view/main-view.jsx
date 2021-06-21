import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

export class MainView extends React.Component {

    //create a component in memory before rendering. Even if not included react will add a constructer method. 
    constructor() {

        //super calls constructor on parent class (in this case "React.Component")
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: true
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

    onRegistered(registered) {
        this.setState({
            registered
        })
    }

    render() {
        //object destruction for const movies = this.state.movies
        const { movies, selectedMovie, user, registered } = this.state;

        if (!user) return (
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
        );

        if (movies.length === 0) return (
            <Row className="main-view justify-content-md-center">
                <div className="main-view" />
            </Row>
        );

        return (
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
        );
    }
}


//allows to export a default value, but only one is possible in the application
export default MainView;