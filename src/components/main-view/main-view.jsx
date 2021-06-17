import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    //create a component in memory before rendering. Even if not included react will add a constructer method. 
    constructor() {

        //super calls constructor on parent class (in this case "React.Component")
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: null
        };
    }

    componentDidMount() {
        axios.get('https://movie-app-alex-offner.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
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

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegistered={registered => this.onRegistered(registered)} />;

        if (!registered) return <RegistrationView onRegistered={registered => this.onRegistered(registered)} onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />))
                }
            </div>
        );
    }
}


//allows to export a default value, but only one is possible in the application
export default MainView;