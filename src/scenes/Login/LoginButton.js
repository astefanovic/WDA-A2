import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class LoginButton extends Component {
    constructor(props) {
        super(props);   
    }
    
    render() {
        return (
            <div>
                <FlatButton onClick={this.props.handleClick} label="Login" secondary={true}/>
                <Popover
                    open={this.props.open}
                    anchorEl={this.props.anchorEl}
                    //For positioning the menu against the button
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    //Handles close requests, such as clicking outside the menu
                    onRequestClose={this.props.handleClose}
                    animation={PopoverAnimationVertical}
                >
                    <Menu>
                        <MenuItem 
                            onClick={() => this.props.handleAuthClick('technician')} 
                            primaryText="Technician" />
                        <MenuItem 
                            onClick={() => this.props.handleAuthClick('helpdesk')} 
                            primaryText="Helpdesk" />
                    </Menu>
                </Popover>
            </div>
        );
    }
}

export default LoginButton;