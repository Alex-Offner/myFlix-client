import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;
        return (
            <div className="director-view">
                <div className="director-name">
                    <span className="headline">Name: </span>
                    <span className="title">{director.Name}</span>
                </div>
                <div className="director-bio">
                    <span className="headline">Bio: </span>
                    <span className="bio">{director.Bio}</span>
                </div>
                <Button onClick={() => { onBackClick(null) }} variant="info">Back</Button>
            </div>
        )
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func
}