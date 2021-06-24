import React from 'react';
import PropTypes from 'prop-types';
import './genre-view.scss';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props;
        return (
            <div className="genre-view">
                <div className="genre-name">
                    <span className="headline">Name: </span>
                    <span className="title">{genre.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="headline">Description: </span>
                    <span className="description">{genre.Description}</span>
                </div>
                <Button onClick={() => { onBackClick(null) }} variant="info">Back</Button>
            </div>
        )
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Descirption: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func
}