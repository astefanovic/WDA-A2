import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui-icons/Done';
import Menu, { MenuItem } from 'material-ui/Menu';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';

//An array of options that the status can be, to be
//used to map the dropdown menu options
const options = [
    "pending", 
    "in progress",
    "unresolved",
    "resolved",
];

class TicketCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //The current option as set by the status dropdown
            status: this.props.ticket.status,
            //The anchoring element the dropdown is centred on
            anchorEl: null,
            //Determines if the dropdown is extended or not
            open: false,
        }
    }
    
    //Handles when the menu button is clicked, setting the menu to open
    handleClick = event => {this.setState({open: true, anchorEl: event.currentTarget});};

    //Handles requests to close the menu, simply closing the menu
    handleRequestClose = () => {this.setState({open: false });};

    //Handles clicking of status menu options, closing the menu
    //and calling another function to update the database
    handleStatusClick = (ticket, option) => {
        this.setState({open: false});
        this.props.handleStatusClick(ticket, option);
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography type="headline" component="h2">
                        {this.props.ticket.subject}
                    </Typography>
                    <Typography type="caption" gutterBottom>
                        {this.props.ticket.type}
                    </Typography>
                    <hr/>
                    <Typography type="body2" gutterBottom>
                        {this.props.ticket.desc}
                    </Typography>
                </CardContent>
                
                <CardActions disableActionSpacing>
                    {/* Button controls the changing of status via a dropdown menu */}
                    <Button onClick={this.handleClick}>{this.props.ticket.status}</Button>
                    <Menu anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose} >
                        {options.map((option, i) => (
                            <MenuItem key={i}
                                selected={i === this.props.ticket.status}
                                onClick={event => 
                                    this.handleStatusClick(this.props.ticket, option)} >
                                {option.toUpperCase()}
                            </MenuItem>
                        ))}
                    </Menu>
                    
                    {/* Button escalates the ticket and unassigns current staff member */}
                    {this.props.ticket.escalation < 3 ? (
                        <Button color="accent"
                            onClick={event=>this.props.handleEscalateClick(this.props.ticket)}>
                           Escalate
                        </Button>
                    ) : null}
                    
                    {(this.props.ticket.completed === 0 && (this.props.ticket.status === "unresolved" || this.props.ticket.status === "resolved")) ? (
                        <Tooltip title="Mark Complete" placement="bottom">
                            <IconButton color="primary" 
                                onClick={event => this.props.handleCompletedClick(this.props.ticket)}>
                                <DoneIcon />
                            </IconButton>
                        </Tooltip>
                    ) : null}    
                </CardActions>
            </Card>
        )
    }
}

export default TicketCard;
