import React from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        //calls custom attribute {movie} from main-view <Movie Card movie ={movie} to use as a props
        const { movie } = this.props;

        return (
            <Card className="card">
                <Card.Img className="movie-card-img" variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text className="movie-card-text">{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="primary">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
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
};