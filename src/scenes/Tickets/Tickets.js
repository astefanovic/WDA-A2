import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import styles from './TicketsStyle';
import PropTypes from 'prop-types';
import HelpdeskTickets from './Helpdesk/HelpdeskTickets';
import TechnicianTickets from './Technician/TechnicianTickets';

class Tickets extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //Props to be passed to the specific pages
        var childProps = this.props;
        if(this.props.type === "Helpdesk") 
            return(<HelpdeskTickets {...childProps}/>);

        if(this.props.type === "Technician")
            return(<TechnicianTickets {...childProps}/>);
        
        //if(this.props.type) return <Redirect to="/" />
    }
}

//Adds the classes for styling
Tickets.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tickets);