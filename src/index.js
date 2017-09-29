import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {BrowserRouter} from'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
/*
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {blue500, blue700, yellowA200} from 'material-ui/styles/colors'
*/
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

/*
//TODO: Try change the theme how they have online, this isn't exactly the same
var muiThemeTemp = getMuiTheme(lightBaseTheme);
muiThemeTemp.palette.primary1Color = blue500;
muiThemeTemp.palette.primary2Color = blue700;
muiThemeTemp.palette.accent1Color = yellowA200;
muiThemeTemp.palette.pickerHeaderColor = blue500;


const muiTheme = muiThemeTemp;
console.log(muiTheme);
*/

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
