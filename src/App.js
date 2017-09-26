import React, { Component } from 'react';
import firebase from 'firebase';
import AppBar from 'material-ui/AppBar';
import SideBar from './components/Navigation/SideBar';
import LoginButton from './scenes/Login/LoginButton';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Accessed by the drawer to toggle extension
            drawerOpen: false,
            //Accessed by the popover to toggle extension
            popoverOpen: false,
        };
    }
    
    componentWillMount () {
        firebase.auth().onAuthStateChanged(this.handleCredentials);
    }
    

    //Function opens the popover centered on the button
    handleLoginClick = (event) => {
        //Prevents the ghost click in touch devices
        event.preventDefault();
        
        this.setState({
            popoverOpen: true,
            //Sets the popover target to the current button
            popoverAnchor: event.currentTarget
        });
    }
    
    //Function handles clicking of a login type
    handleAuthClick = (type) => {
        //First closes popover
        this.setState({popoverOpen: false});
        //Sets the provider and pops up login dialog
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((success) => { })
            .then(() => { });
    }
    
    handleCredentials = (params) => {
        console.log(params);
    }
    
    //Function sets the popover to closed
    handleClosePopover = () => this.setState({popoverOpen: false});
    
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
            iconElementRight={<LoginButton open={this.state.popoverOpen}
                                handleClick={this.handleLoginClick}
                                handleClose={this.handleClosePopover}
                                handleAuthClick={this.handleAuthClick}
                                anchorEl={this.state.popoverAnchor} />}
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
