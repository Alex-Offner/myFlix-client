import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'react-bootstrap/esm/Image';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <>
        {filteredMovies.map(m => (
            <Col md={3} key={m._id}>
                <MovieCard movie={m} />
            </Col>
        ))}
    </>;
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
    movies: PropTypes.array
    /*     movies: PropTypes.arrayOf(PropTypes.shape({
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            ImagePath: PropTypes.string.isRequired,
            Director: PropTypes.shape({
                Name: PropTypes.string
            }).isRequired,
            Drama: PropTypes.shape({
                Name: PropTypes.string
            })
        })).isrequired */
    /*     visibilityFilter: PropTypes.func.isRequired */
}