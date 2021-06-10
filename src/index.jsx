import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';


import './index.scss';

//The main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);