import React from 'react';

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
                    <span className="director-name">{movie.Director}</span>
                </div>
                <div className="movie-genre">
                    <span className="headline">Genre: </span>
                    <span className="genre-name">{movie.Genre}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        )
    }

}