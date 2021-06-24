import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

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
                {/*                 <Link to={`/`}>
                    <Button variant="info">Back</Button>
                </Link> */}
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