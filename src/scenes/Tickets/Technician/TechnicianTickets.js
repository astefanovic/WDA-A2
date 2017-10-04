import React, { Component } from 'react';
import { apiurl } from '../../../services/constants';
import { withStyles } from 'material-ui/styles';
import styles from './TechnicianTicketsStyle'
import TicketCard from './TicketCard';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
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
        //this.state.tickets.map((ticket, i) => (console.log(ticket.id)));
        return (
            <div className={classes.bodyOffset}>
                <Grid container justify="space-around">
                    {this.state.tickets.map((ticket, i) => (
                        <Grid key={i} item>
                            <TicketCard ticket={ticket}
                                handleCompletedClick={this.handleCompletedClick}
                                handleEscalateClick={this.handleEscalateClick}
                                handleStatusClick={this.handleStatusChange} />
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