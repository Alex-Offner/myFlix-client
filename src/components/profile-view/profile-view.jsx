import React from 'react';
import PropTypes from 'prop-types';
import './profile-view.scss';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            birthday: "",
            email: ""
        };
    }

    render() {
        const { user, onBackClick } = this.props;
        return (
            <div className="profile-view">
                <div className="profile-username">
                    <span className="headline">Username: </span>
                    <span className="title">{user.username}</span>
                </div>
                <div className="profile-email">
                    <span className="headline">Email: </span>
                    <span className="title">{user.email}</span>
                </div>
                <div className="profile-birthday">
                    <span className="headline">Birthday: </span>
                    <span className="title">{user.birthday}</span>
                </div>
                <div className="movie-genre">
                    <span className="headline">List of favourite movies: </span>
                    <span className="title">{user.favouriteMovies}</span>
                </div>
                <Button onClick={() => { onBackClick(null) }} variant="info">Back</Button>
            </div>
        )
    }

}

ProfileView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.number,
        favouriteMovies: PropTypes.shape(
            []).isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};