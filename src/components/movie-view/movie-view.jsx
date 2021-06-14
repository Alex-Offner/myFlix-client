import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    //just testing adding and removing event listeners on mounted and unmounted components
    /*
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }
*/
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
                    <span className="director-name">{movie.Director.Name}</span>
                </div>
                <div className="movie-genre">
                    <span className="headline">Genre: </span>
                    <span className="genre-name">{movie.Genre.Name}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
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
        }).isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};