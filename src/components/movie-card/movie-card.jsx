import React from 'react';

export class MovieCard extends React.Component {
    render() {
        //calls custom attribute {movie} from main-view <Movie Card movie ={movie} to use as a props
        const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
}