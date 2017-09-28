import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import styles from './SideBarStyle'
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

class SideBar extends Component {
    constructor(props) {
        super(props);   
    }
    
    render() {
        const classes = this.props.classes;
        return (
        <Drawer type="permanent"
           classes={{paper: classes.sidebar}}
            //open={this.props.open}
            //Undocked drawer allowing for toggling of opening
            //docked={false}
            //Sets the drawer opening based on the variable
            //passed in the request
            //onRequestChange={(open) => {this.props.handleSet(open)}}
            >
            <List>
                <ListItem button>
                    <ListItemText primary="Tickets"/>
                </ListItem>
                <Divider />
                <ListItem button component="a" href="https://github.com/astefanovic/wda-a2">
                    <ListItemText primary="Github" secondary="by A. Stefanovic & K. Kartung"/>
                </ListItem>
            </List>
                {/*<MenuItem onClick={this.props.handleClose}>Login</MenuItem>
            <MenuItem onClick={this.props.handleClose}>Register</MenuItem> */}
        </Drawer>
        );
    }
}

//Adds the classes for styling
SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);