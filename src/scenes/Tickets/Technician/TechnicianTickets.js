import React, { Component } from 'react';
import { apiurl } from '../../../services/constants';

class TechnicianTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //The array to store all tickets for the current user
            tickets: null,
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
        .then((response) => {this.setState({tickets: response.json()}); 
                             console.log(response.json());});
    }
    
    render() {
        return (
            null
        );
    }
}

export default TechnicianTickets;