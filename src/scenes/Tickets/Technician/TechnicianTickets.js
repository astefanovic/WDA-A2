import React, { Component } from 'react';
import { apiurl } from '../../../services/constants';
import { withStyles } from 'material-ui/styles';
import styles from './TechnicianTicketsStyle';
import TicketCard from './TicketCard';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
class TechnicianTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //The array to store all tickets for the current user
            tickets: [],
	    //An array storing all the comments in the database
	    comments: [],
            //An array to hold the status of each ticket
            status: [],
            //An array to hold the priority of each tickets
            priority: [],
            //An array to hold the expansion of each ticket
            expansion: []
        };
    }

    componentWillMount() {
        //First fetches the tickets to display
        this.getTickets();
	//Also fetches all the comments
	this.getComments();
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
            body:formData
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
    }
    
    //Fetches all comments to pass to comment components, abstracted to this to reduce
    //the number of fetches made
    getComments = () => {
	//Simple get to populate array
	fetch(apiurl + '/comments')
	    .then((response) => response.json())
	    .then((response) => {
		console.log(response);
		const commentsArray=[];
		for(const i in response) {
		    commentsArray.push(response[i]);
		}
		return commentsArray;
	    })
	    .then((comments) => {this.setState({comments: comments}); })
	    .catch((error) => { console.log(error); });
    }

    //Sets the ticket to completed through the API
    //and then reloads the tickets
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
        //Sets the completed to true (1)
        formData.append('completed', 1);
        

        //Posts the uid to the API
        fetch(apiurl + '/tickets/update', {
            method:'POST',
            body:formData,
        })
        .then((response) => console.log(response.json()))
        .catch((error) => {console.log(error)});
        
        //Delay to wait for API
        setTimeout(this.getTickets, 1000);
    }
    
    //Escalates the priority by one
    handleEscalateClick = (ticket) => {
        var formData = new FormData();
        formData.append('id', ticket.id);
        formData.append('subject', ticket.subject);
        formData.append('desc', ticket.desc);
        formData.append('status', ticket.status);
        formData.append('escalation', ++ticket.escalation);
        formData.append('priority', ticket.priority);
        formData.append('user_id', ticket.user_id);
        //Unassigning the current staff member
        formData.append('staff_id', "");
        formData.append('completed', ticket.completed);
        
        //Posts the new ticket to the API
        fetch(apiurl + '/tickets/update', {
            method:'POST',
            body:formData,
        })
        .then((response) => console.log(response.json()))
        .catch((error) => {console.log(error)});
        
        //Delay to wait for API
        setTimeout(this.getTickets, 1000);
    }
    
    //Sets the status equal to option passed from click handler
    handleStatusChange = (ticket, option) => {
        var formData = new FormData();
        formData.append('id', ticket.id);
        formData.append('subject', ticket.subject);
        formData.append('desc', ticket.desc);
        //Status is updated based on the selected menu item
        formData.append('status', option);
        formData.append('escalation', ticket.escalation);
        formData.append('priority', ticket.priority);
        formData.append('user_id', ticket.user_id);
        formData.append('staff_id', ticket.staff_id);
        formData.append('completed', ticket.completed);
        
        //Posts the new ticket to the API
        fetch(apiurl + '/tickets/update', {
            method:'POST',
            body:formData,
        })
        .then((response) => console.log(response.json()))
        .catch((error) => {console.log(error)});
        
        //Delay to wait for API
        setTimeout(this.getTickets, 1000);
    }
    
    render() {
        const classes = this.props.classes;
        //this.state.tickets.map((tickets, i) => (console.log(tickets.id)));
        return (
            <div className={classes.bodyOffset}>
                <Grid container justify="space-around">
                    {this.state.tickets.map((ticket, i) => (
                        <Grid key={i} item>
                          <TicketCard ticket={ticket}
				      comments={this.state.comments}
                                      handleCompletedClick={this.handleCompletedClick}
                                      handleEscalateClick={this.handleEscalateClick}
                                      handleStatusClick={this.handleStatusChange}
				      getComments={this.getComments}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

//Adds the classes for styling
TechnicianTickets.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TechnicianTickets);
