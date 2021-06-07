import React from 'react';
import ReactDOM from 'react-dom';


import './index.scss';

//The main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <div>Good morning</div>
            </div>
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);