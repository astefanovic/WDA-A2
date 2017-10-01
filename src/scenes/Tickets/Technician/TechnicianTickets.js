import React, { Component } from 'react';
import { apiurl } from '../../../services/constants';
import { withStyles } from 'material-ui/styles';
import styles from './TechnicianTicketsStyle'
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui-icons/Done';
import Typography from 'material-ui/Typography';

class TechnicianTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //The array to store all tickets for the current user
            tickets: [],
            //An array to hold the status of each ticket
            status: [],
            //An array to hold the priority of each ticket
            priority: [],
            //An array to hold the expansion of each ticket
            expansion: [],
        }
    }

    componentWillMount() {
        //First fetches the tickets to display
        this.getTickets();
    }

    //Fetches the tickets assigned to the current user
    getTickets = () => {
        //The uid of the current user is stored
        //in a formData object to be sent to the API
        var formData = new FormData();
        formData.append('uid', this.props.user.uid);
        formData.append('type', this.props.type);

        //Posts the uid to the API
        fetch(apiurl + '/staff/tickets', {
            method:'POST',
            body:formData,
        })        
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            const ticketsArray = [];
            for(const i in responseJson) {
                console.log(responseJson[i]);
                ticketsArray.push(responseJson[i]);
                //this.forceUpdate();
            }
            return ticketsArray;
        })
        .then((tickets) => {this.setState({tickets: tickets});})
        .catch((error) => {console.log(error)});
        
        //Setting the state of each ticket to be used in the onClick functions
        this.state.tickets.map((ticket, index) => this.setTicketStates(ticket,index));
    }
    
    //Sets the provided tickets status and priority in the state
    setTicketStates = (ticket, index) => {
        var status = this.state.status;
        status[index] = ticket.status;
        
        var priority = this.state.priority;
        priority[index] = ticket.priority;
        
        this.setState({status: status, priority: ticket});
    };

    //Sets the ticket to completed
    handleCompletedClick = (ticket) => {
        console.log(ticket);
        var formData = new FormData();
        formData.append('id', ticket.id);
        formData.append('subject', ticket.subject);
        formData.append('desc', ticket.desc);
        formData.append('status', ticket.status);
        formData.append('escalation', ticket.escalation);
        formData.append('priority', ticket.priority);
        formData.append('user_id', ticket.user_id);
        formData.append('staff_id', ticket.staff_id);
        formData.append('completed', 1);
        

        //Posts the uid to the API
        fetch(apiurl + '/tickets/update', {
            method:'POST',
            body:formData,
        })
        .then((response) => console.log(response.json()))
        .catch((error) => {console.log(error)});
        
        setTimeout(this.getTickets, 3000);
    }

    //Opens the clicked list
    /*
    handleStatusListClick = (event, index) => {
        var open = this.state.statusOpen;
        open[i] = true;
        var anchor = this.state.status
        this.setState({statusOpen: open, })
    } */

    render() {
        const classes = this.props.classes;
        //this.state.tickets.map((ticket, i) => (console.log(ticket.id)));
        return (
            <div className={classes.bodyOffset}>
                <Grid container justify="space-around">
                    {this.state.tickets.map((ticket, i) => (
                        <Grid key={i} item>
                            <Card>
                                <CardContent>
                                    <Typography type="headline" component="h2">
                                        {ticket.subject}
                                    </Typography>
                                    <Typography type="caption" gutterBottom>
                                        {ticket.type}
                                    </Typography>
                                    <hr/>
                                    <Typography type="body2" gutterBottom>
                                        {ticket.desc}
                                    </Typography>
                                </CardContent>
                                    <CardActions disableActionSpacing>
                                           {/*
                                            <Grid item xs="4">
                                                <List>
                                                    <ListItem button onClick={this.handleStatusListClick(event, i)}>
                                                        <ListItemText primary={this.state.status[i]} />
                                                    </ListItem>
                                                </List>
                                                <Menu anchorEl={this.state.statusAnchor[i]}
                                                    open={this.state.statusOpen[i]}
                                                    onRequestClose={this.handleRequestClose}>
                                                    <MenuItem></MenuItem>
                                                </Menu>
                                                    
                                            </Grid> */}
                                                {ticket.completed === 0 ? (
                                                    <IconButton color="primary" 
                                                        onClick={event => this.handleCompletedClick(ticket)}><DoneIcon /></IconButton>
                                                ) : null}    
                                    </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

//Adds the classes for styling
TechnicianTickets.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TechnicianTickets);