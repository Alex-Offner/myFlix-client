import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        //calls custom attribute {movie} from main-view <Movie Card movie ={movie} to use as a props
        const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }),
        Drama: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};