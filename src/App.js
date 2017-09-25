import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import SideBar from './components/Navigation/SideBar'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Accessed by the drawer to check if it is extended
            drawerOpen: false
        };
    }

    //Function alternates true/false to toggle the drawer
    handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

    //Function sets the drawer opening based on the boolean given
    handleSetDrawer = (open) => this.setState({drawerOpen: open});

    //Function sets the drawer to closed
    handleCloseDrawer = () => this.setState({drawerOpen: false});
    

render() {
    return (
        <div>
        <AppBar 
            title="RMIT Ticketing System" 
            onLeftIconButtonTouchTap={this.handleDrawerToggle}
            iconElementRight={<FlatButton label="Login" />}
        />
        {/* Sidebar for navigation, drawer opening methods passed to it */}
        <SideBar open={this.state.drawerOpen}
        handleSet={this.handleSetDrawer}
        handleClose={this.handleCloseDrawer} />
        </div>
    );
}
}

export default App;
