import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    //create a component in memory before rendering. Even if not included react will add a constructer method. 
    constructor() {

        //super calls constructor on parent class (in this case "React.Component")
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with Emma Thomas, his wife. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', Director: 'Christopher Nolan', Genre: 'Drama' },
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'description2', ImagePath: '...' },
                { _id: 3, Title: 'Gladiator', Description: 'description3', ImagePath: '...' },
                { _id: 4, Title: 'The Lord of the Rings', Description: 'description4', ImagePath: '...' }

            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        //object destruction for const movies = this.state.movies
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list of movies is empty!</div>;

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