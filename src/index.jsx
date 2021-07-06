import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';


import './index.scss';

//Creates store for redux
const store = createStore(moviesApp, devToolsEnhancer());

//The main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container className="container" fluid="md">
                    <MainView />
                </Container>
            </Provider>

        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);