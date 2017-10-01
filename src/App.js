import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import styles from './AppStyle'
import PropTypes from 'prop-types';
import { apiurl } from './services/constants';
import firebase from 'firebase';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import SideBar from './components/Navigation/SideBar';
import LoginButton from './scenes/Login/LoginButton';
import Tickets from './scenes/Tickets/Tickets';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Accessed by the drawer to toggle extension
            drawerOpen: false,
            //Accessed by the popover to toggle extension
            popoverOpen: false,
            //Accessed by the snackbar alert to toggle extension
            snackbarOpen: false,
            //The current user object as provided by auth
            user: null,
            //The current user's type
            type: null,
        };
    }
    
    //TODO: Fix on auto login, type not set
    componentWillMount () {
        firebase.auth().onAuthStateChanged(this.handleCredentials);
        //HOTFIX: firebase logs out on reload
        window.addEventListener('beforeunload', this.handleSignoutClick);
    }
    
    //HOTFIX: firebase logs out on reload
    componentWillUnmount() {
        this.handleSignoutClick();
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
        //First closes popover and sets type
        this.setState({popoverOpen: false,
                      type: type});
        //Sets the provider and pops up login dialog
        const provider = new firebase.auth.GoogleAuthProvider();
        var formData;
        
        firebase.auth().signInWithPopup(provider)
            .then((success) => {this.handleCredentials(success.user)})
            .then(() => {
                //Creates a FormData object to be given to the API,
                //as it doesn't accept json
                formData = new FormData();
                formData.append('uid', this.state.user.uid);
                formData.append('name', this.state.user.displayName);
                formData.append('email', this.state.user.email);
                formData.append('type', this.state.type);
            })
            .then(() => {
            fetch(apiurl + '/staff', {
                method:'POST',
                body: formData,
            })
            .then((response) => {console.log(response.json())})
            .catch((error) => {console.log(error)});
        });
    }
    
    //Adds the user details from auth to the state
    handleCredentials = (params) => {
        console.log(params);
        console.log(this.state.type);
        this.setState({user: params});
    }
    
    //Removes the user and type from the state
    //and signs out in auth
    handleSignoutClick = () => {
        const vm = this;
        vm.setState({
            user: null,
            type: null
        });
        firebase.auth().signOut();
    }
    
    //Function that alerts the user to login by opening snackbar
    handleSnackbarOpen = () => {if(!this.state.user) this.setState({snackbarOpen: true})};

    //Functin that closes the snackbar
    handleCloseSnackbar = () => {this.setState({snackbarOpen: false})};
    
    //Function sets the popover to closed
    handleClosePopover = () => this.setState({popoverOpen: false});    

render() {
    const classes = this.props.classes;
    return (
        <div className={classes.relative}>
        <AppBar 
            title="RMIT Ticketing System"
            className={classes.appbar} >
                <Toolbar>
                   <Grid container justify="space-between" align="center"  >
                        <Grid item>
                           <Typography type="title" className={classes.title}>
                               RMIT Ticketing System    
                           </Typography>
                        </Grid>
                        <Grid item>
                            <LoginButton className={classes.right} 
                                open={this.state.popoverOpen}
                                user={this.state.user}
                                handleClick={this.handleLoginClick}
                                handleClose={this.handleClosePopover}
                                handleAuthClick={this.handleAuthClick}
                                handleSignoutClick={this.handleSignoutClick}
                                anchorEl={this.state.popoverAnchor} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        {/* Sidebar for navigation, drawer opening methods passed to it */}
        <SideBar 
        open={this.state.drawerOpen}
        handleSet={this.handleSetDrawer}
        handleClose={this.handleCloseDrawer} 
        handleSnackbarOpen={this.handleSnackbarOpen}/>
        
        {/*Routes to page for managing tickets and home splash page */}
        <Switch>
          <Route path="/tickets" render={() => (
                    this.state.user ? (
                        <Tickets className={classes.bodyOffset}
                            user={this.state.user}
                            type={this.state.type}/>
                    ) : (
                        <Redirect to="/" />
                    ))} />
          <Route exact path="/" component={() => <div></div>} />
          {/* Page not found route */}
          <Route render={() => {
                    <Typography type="display3" align="center" className={classes.bodyOffset}>
                        Page Not Found
                    </Typography>}} />
        </Switch>
        
        {/* Alert when the user doesnt log in and gets redirected */}
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={this.state.snackbarOpen}
            autoHideDuration={5000}
            onRequestClose={this.handleCloseSnackbar}
            message={"Login above to view tickets"}
        />
        </div>
    );
}
}

//Adds the classes for styling
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
