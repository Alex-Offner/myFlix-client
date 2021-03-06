import React from 'react';
/* import PropTypes, { string } from 'prop-types'; */
import PropTypes from 'prop-types';
import './profile-view.scss';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Form, FormControl, Card, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameErr: "",
            passwordErr: "",
            emailErr: "",
        };
    }


    componentDidMount() {
        let token = localStorage.getItem("token");
        /*         this.getUser(token); */
        console.log(this.props);
    }

    /*     getUser(token) {
            axios.get('https://movie-app-alex-offner.herokuapp.com/users/' + this.props.user, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    //this.props.setNewUser(response.data);
                    this.setState({
                        user: response.data
                    });
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        } */

    handleUpdate(e) {
        let user = localStorage.getItem("user");
        let token = localStorage.getItem("token");
        const isValid = this.formValidation();
        if (isValid) {
            axios.put('https://movie-app-alex-offner.herokuapp.com/users/' + user,
                {
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    birthday: this.state.birthday
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then((response) => {
                    const data = response.data;
                    localStorage.setItem("user", data.username);
                    console.log(data);
                    alert(user + " has been updated");
                    window.location.pathname = `/users/${data.username}`;
                })
                .catch(function (error) {
                    console.log(error.response.data);
                })
        }

    }

    handleDelete() {
        let confirmAction = confirm("Are you sure you want to delete your account?");
        if (confirmAction) {
            let token = localStorage.getItem("token");
            let user = localStorage.getItem("user");
            axios.delete('https://movie-app-alex-offner.herokuapp.com/users/' + user,
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then(() => {
                    alert(user + " has been deleted!");
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    window.location.pathname = "/";
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    removeMovie(movie) {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        axios.delete('https://movie-app-alex-offner.herokuapp.com/users/' + user + '/favouriteMovies/' + movie._id,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                alert(movie.Title + " has been removed from your list if favourites!");
                window.location.pathname = `/users/${user}`
                /* this.componentDidMount(); */
            })



    }

    handleChange(e) {
        let { name, value } = e.target;
        console.log(name, value);
        this.setState({
            [name]: value
        })
    }

    formValidation() {
        let usernameErr = {};
        let passwordErr = {};
        let emailErr = {};

        let isValid = true;

        if (this.state.username.trim().length < 5) {
            usernameErr.usernameShort = "Username is too short.";
            isValid = false;
        }

        if (!this.state.username.match(/^[0-9a-zA-Z]+$/)) {
            usernameErr.usernameNotAlphanumeric = "Username must only include alphanumeric symbols.";
            isValid = false;
        }

        if (this.state.password.trim().length === 0) {
            passwordErr.noPassword = "Password is required.";
            isValid = false;
        }

        if (this.state.email.trim().length === 0) {
            emailErr.noEmail = "Email is required.";
            isValid = false;
        }

        if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
            emailErr.noAtSymbol = "Email is not valid.";
            isValid = false;
        }

        this.setState({
            usernameErr: usernameErr,
            passwordErr, passwordErr,
            emailErr: emailErr,
        })
        return isValid;
    }

    render() {
        const { movies, user } = this.props;
        const { usernameErr, passwordErr, emailErr } = this.state;
        // console.log(movies);
        const ListOfFavouriteMovies = movies.filter((movie) => {
            return user.favouriteMovies.includes(movie._id);
        });
        // console.log(this.props);
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
                <br></br>
                <Card.Text className="mt-200" as="h3">Favourite Movies:</Card.Text>
                <Row>
                    {ListOfFavouriteMovies.map((movie) => {
                        return (
                            <Col md={3} key={movie._id}>
                                <div key={movie._id}>
                                    <Card>
                                        <Card.Img className="card-img" variant="top" src={movie.ImagePath} />
                                        <Card.Body>
                                            <Link to={`/movies/${movie._id}`}>
                                                <Card.Title>{movie.Title}</Card.Title>
                                            </Link>
                                            <Button variant="danger" onClick={() => this.removeMovie(movie)}>Remove Movie</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
                <br></br>

                <Form className="justify-content-md-center">
                    <h3>Update your Profile Details</h3>

                    <div className="profile-form">
                        <Form.Group controlid="formUsername">
                            <Form.Label>Username: </Form.Label>
                            <FormControl type="text" name="username" placeholder="Change username" value={this.state.username || ''} onChange={(e) => this.handleChange(e)} />
                        </Form.Group>
                        {Object.keys(usernameErr).map((key) => {
                            return <div key={key} style={{ color: "red" }}>{usernameErr[key]}</div>
                        })}

                        <Form.Group controlid="formPassword">
                            <Form.Label>Password: </Form.Label>
                            <FormControl type="password" name="password" placeholder="Change password" value={this.state.password || ''} onChange={(e) => this.handleChange(e)} />
                        </Form.Group>
                        {Object.keys(passwordErr).map((key) => {
                            return <div key={key} style={{ color: "red" }}>{passwordErr[key]}</div>
                        })}

                        <Form.Group controlid="formEmail">
                            <Form.Label>Email: </Form.Label>
                            <FormControl type="email" name="email" placeholder="Change email" value={this.state.email || ''} onChange={(e) => this.handleChange(e)} />
                        </Form.Group>
                        {Object.keys(emailErr).map((key) => {
                            return <div key={key} style={{ color: "red" }}>{emailErr[key]}</div>
                        })}

                        <Form.Group controlid="formBirthday">
                            <Form.Label>Birthday: </Form.Label>
                            <FormControl type="date" name="birthday" value={this.state.birthday || ''} onChange={(e) => this.handleChange(e)} />
                        </Form.Group>


                        <Button className="mb-2" variant="primary"
                            onClick={() => this.handleUpdate(this.state.user)}
                        >
                            Save changes
                        </Button>
                        <Link to={`/`}>
                            <Button className="mb-2" variant="info">Back</Button>
                        </Link>
                        <Button className="mb-2" variant="danger"
                            size="md"
                            onClick={() => this.handleDelete()}
                        >
                            Delete Account
                        </Button>
                    </div>

                </Form>


            </div >
        )
    }

}

let mapStateToProps = state => {
    return { newUser: state.newUser }
}

export default connect(mapStateToProps, { setUser })(ProfileView);

ProfileView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string
    }).isRequired,
    token: PropTypes.string.isRequired,
    movies: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }).isRequired,
        Drama: PropTypes.shape({
            Name: PropTypes.string
        })
    })).isRequired,
    onLoggedIn: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
}
