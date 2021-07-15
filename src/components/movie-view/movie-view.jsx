import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

    addMovie() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios.post('https://movie-app-alex-offner.herokuapp.com/users/' + user + '/favouriteMovies/' + this.props.movie._id, {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                alert(this.props.movie.Title + " has been added to your list of favourites!");
            })
    }

    removeMovie() {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios.delete('https://movie-app-alex-offner.herokuapp.com/users/' + user + '/favouriteMovies/' + this.props.movie._id,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                alert(this.props.movie.Title + " has been removed from your list if favourites!");
            })

    }

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img className="movie-img" src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="headline">Title: </span>
                    <span className="title">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="headline">Description: </span>
                    <span className="description">{movie.Description}</span>
                </div>
                <div className="movie-director">
                    <span className="headline">Director: </span>
                    <span className="director-name">
                        <Link to={`/director/${movie.Director.Name}`}>
                            {movie.Director.Name}
                        </Link>
                    </span>
                </div>
                <div className="movie-genre">
                    <span className="headline">Genre: </span>
                    <span className="genre-name">
                        <Link to={`/genre/${movie.Genre.Name}`}>
                            {movie.Genre.Name}
                        </Link>
                    </span>
                </div>
                <Button className="add-movie-button" variant="primary" onClick={() => this.addMovie(movie)}>Add movie</Button>
                <Button variant="danger" onClick={() => this.removeMovie(movie)}>Remove movie</Button>
                <br></br>
                <br></br>
                <Button onClick={() => { onBackClick(null) }} variant="info">Back</Button>
            </div>
        )
    }

}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }).isRequired,
        Drama: PropTypes.shape({
            Name: PropTypes.string
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};