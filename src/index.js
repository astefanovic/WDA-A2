import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {BrowserRouter} from'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC675kWA3yIS6nIgvWO6GX1qf3vwXAD4_c",
    authDomain: "wda-a2-32e73.firebaseapp.com",
    databaseURL: "https://wda-a2-32e73.firebaseio.com",
    projectId: "wda-a2-32e73",
    storageBucket: "wda-a2-32e73.appspot.com",
    messagingSenderId: "929810485481"
};

firebase.initializeApp(config);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
