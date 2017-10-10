import React, {Component} from 'react';
import {apiurl} from '../../../services/constants';
import TicketCard from './TicketCard';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import styles from './HelpdeskTicketStyle';

const type = "Technician";

class HelpdeskTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Store all tickets
            tickets: [],
            //Store all comments
            comments: [],
            //Store all technicians
            technicians: [],

            priority: [],
        };
    }

    componentWillMount() {
        //Fetches tickets
        this.getTickets();
        //Fetches comments
        this.getComments();
        //Fetches technicians
        this.getTechnicians();
    }

    getTickets = () => {
        fetch(apiurl + '/tickets')
            .then((response) => response.json())
            .then((responseJson) => {
                const ticketsArray = [];
                for (const i in responseJson) {
                    console.log(responseJson[i]);
                    ticketsArray.push(responseJson[i]);
                }
                return ticketsArray;
            })
            .then((tickets) => {
                this.setState({tickets: tickets});
            })
            .catch((error) => {
                console.log(error)
            });
    };

    getComments = () => {
        fetch(apiurl + '/comments')
            .then((response) => response.json())
            .then((responseJson) => {
                const commentsArray = [];
                for (const i in responseJson) {
                    commentsArray.push(responseJson[i]);
                }
                return commentsArray;
            })
            .then((comments) => {
                this.setState({comments: comments});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getTechnicians = () => {
        var formData = new FormData();
        formData.append('type', type);

        fetch(apiurl + '/staff/techs', {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const techniciansArray = [];
                for (const i in responseJson) {
                    techniciansArray.push(responseJson[i]);
                }
                return techniciansArray;
            })
            .then((techniciansArray) => {
                this.setState({technicians: techniciansArray});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /*getTechnicians = () => {
        fetch(apiurl + '/staff')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const techniciansArray = [];
                for (const i in responseJson) {
                    techniciansArray.push(responseJson[i]);
                }
                return techniciansArray;
            })
            .then((technicians) => {
                this.setState({technicians: technicians});
            })
            .catch((error) => {
                console.log(error);
    };*/


    handleAssignChange = (ticket, technician) => {
         var formData = new FormData();
         formData.append('id', ticket.id);
         formData.append('subject', ticket.subject);
         formData.append('desc', ticket.desc);
         formData.append('status', ticket.status);
         formData.append('escalation', ticket.escalation);
         formData.append('priority', ticket.priority);
         formData.append('user_id', ticket.user_id);
         formData.append('staff_id', technician);
         formData.append('completed', ticket.completed);

         fetch(apiurl + '/tickets/update', {
             method: 'POST',
             body: formData,
         })
             .then((response) => console.log(response.json()))
             .catch((error) => {
                 console.log(error)
             });

         setTimeout(this.getTickets, 1000);
     };

    handlePriorityChange = (ticket, prOption) => {
        var formData = new FormData();
        formData.append('id', ticket.id);
        formData.append('subject', ticket.subject);
        formData.append('desc', ticket.desc);
        formData.append('status', ticket.status);
        formData.append('escalation', ticket.escalation);
        formData.append('priority', prOption);
        formData.append('user_id', ticket.user_id);
        formData.append('staff_id', ticket.staff_id);
        formData.append('completed', ticket.completed);

        fetch(apiurl + '/tickets/update', {
            method: 'POST',
            body: formData,
        })
            .then((response) => console.log(response.json()))
            .catch((error) => {
                console.log(error)
            });

        setTimeout(this.getTickets, 3000);
    };

    handleEscalationChange = (ticket, escalation) => {
        var formData = new FormData();
        formData.append('id', ticket.id);
        formData.append('subject', ticket.subject);
        formData.append('desc', ticket.desc);
        formData.append('status', ticket.status);
        formData.append('escalation', escalation);
        formData.append('priority', ticket.priority);
        formData.append('user_id', ticket.user_id);
        formData.append('staff_id', ticket.staff_id);
        formData.append('completed', ticket.completed);

        fetch(apiurl + '/tickets/update', {
            method: 'POST',
            body: formData,
        })
            .then((response) => console.log(response.json()))
            .catch((error) => {
                console.log(error)
            });

        setTimeout(this.getTickets, 3000);
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.bodyOffset}>
                <Grid container justify="space-around">
                    {this.state.tickets.map((ticket, i) => (
                        <Grid key={i} item>
                            {console.log(this.state.technicians)}
                            <TicketCard ticket={ticket} comments={this.state.comments}
                                        technicians={this.state.technicians}
                                        handleAssignClick={(this.handleAssignChange)}
                                        handlePriorityChange={(this.handlePriorityChange)}
                                        handleEscalationChange={(this.handleEscalationChange)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HelpdeskTickets);