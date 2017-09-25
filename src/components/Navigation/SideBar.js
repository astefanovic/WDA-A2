import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class SideBar extends Component {
    constructor(props) {
        super(props);   
    }
    
    render() {
        return (
        <Drawer open={this.props.open}
            //Undocked drawer allowing for toggling of opening
            docked={false}
            //Sets the drawer opening based on the variable
            //passed in the request
            onRequestChange={(open) => {this.props.handleSet(open)}}>
            <MenuItem onClick={this.props.handleClose}>Login</MenuItem>
            <MenuItem onClick={this.props.handleClose}>Register</MenuItem>
        </Drawer>
        );
    }
}

export default SideBar;