import React, {Component} from 'react';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import Tooltip from 'material-ui/Tooltip';

//Priority Options
const prOption = [
    "Low",
    "Medium",
    "High",
];

//Escalation Options
const escalation = [
    "1",
    "2",
    "3",
];

class TicketCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //The anchoring element the dropdown is centred on
            anchorEl: null,
            //Determines if the comments section is extended
            expanded: false,
            //Ticket choice
            tchoiceopen: false,
            //Priority choice
            pchoiceopen: false,
            //Escaltion choice
            echoiceopen: false,
            //Temp Technician name
            techname: "",
        };
    };

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    handleAClick = event => {
        this.setState({tchoiceopen: true, anchorEl: event.currentTarget});
    };

    handlePClick = event => {
        this.setState({pchoiceopen: true, anchorEl: event.currentTarget});
    };

    handleEClick = event => {
        this.setState({echoiceopen: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({tchoiceopen: false, pchoiceopen: false, echoiceopen: false});
    };

    handleAssignClick = (ticket, technician) => {
        this.setState({tchoiceopen: false});
        this.props.handleAssignClick(ticket, technician.id);

        this.setState({techname : technician.name});
    };

    handlePriorityClick = (ticket, prOption) => {
        this.setState({pchoiceopen: false});
        this.props.handlePriorityChange(ticket, prOption);
    };

    handleEscalationClick = (ticket, escalation) => {
        this.setState({echoiceopen: false});
        this.props.handleEscalationChange(ticket, escalation);
    };

    checkCommentId = (current, index, array) => {
        return this.props.ticket.id === current.ticket_id;
    };

    findTechnicianName = (staff_id) => {
        this.props.technicians.forEach((technician) => {
            if (technician.id === staff_id) {
                this.setState({techname: technician.name});
            } else
                this.setState({techname: "NONE"});
        })
    };

    componentWillMount() {
        this.findTechnicianName(this.props.ticket.staff_id);
        setTimeout(() => (this.findTechnicianName(this.props.ticket.staff_id)), 1000);
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
                    <Tooltip title="Assign Technician" placement="bottom">
                        <Button onClick={this.handleAClick}>
                            {this.state.techname}
                        </Button>
                    </Tooltip>
                    <Menu anchorEl={this.state.anchorEl} open={this.state.tchoiceopen}
                          onRequestClose={this.handleRequestClose}>
                        {this.props.technicians.map((technician, i) => (
                            <MenuItem key={i}
                                      selected={i === this.props.ticket.staff_id}
                                      onClick={event => this.handleAssignClick(this.props.ticket, technician)}>
                                {technician.name}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Tooltip title="Set Priority" placement="bottom">
                        <Button onClick={this.handlePClick}>
                            {this.props.ticket.priority}
                        </Button>
                    </Tooltip>
                    <Menu anchorEl={this.state.anchorEl} open={this.state.pchoiceopen}
                          onRequestClose={this.handleRequestClose}>
                        {prOption.map((prOption, i) => (
                            <MenuItem key={i}
                                      selected={i === this.props.ticket.priority}
                                      onClick={event => this.handlePriorityClick(this.props.ticket, prOption)}>
                                {prOption.toUpperCase()}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Tooltip title="Escalation" placement="bottom">
                        <Button onClick={this.handleEClick}>
                            {this.props.ticket.escalation}
                        </Button>
                    </Tooltip>
                    <Menu anchorEl={this.state.anchorEl} open={this.state.echoiceopen}
                          onRequestClose={this.handleRequestClose}>
                        {escalation.map((escalation, i) => (
                            <MenuItem key={i}
                                      selected={i === this.props.ticket.escalation}
                                      onClick={event => this.handleEscalationClick(this.props.ticket, escalation)}>
                                {escalation}
                            </MenuItem>
                        ))}
                    </Menu>

                    <IconButton onClick={this.handleExpandClick} aria-expanded={this.state.expanded}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} transitionDuration={"auto"}>
                    <CardContent>
                        {this.props.comments.some(this.checkCommentId) ? (
                            this.props.comments.map((comment, i) => (
                                this.props.ticket.id === comment.ticket_id ? (
                                    <div key={i}>
                                        <Divider/>
                                        <br/>
                                        <Typography type="body1" key={i}>
                                            {comment.text}
                                        </Typography>
                                        <Typography type="caption">
                                            {comment.email}
                                        </Typography>
                                        <br/>
                                    </div>) : null
                            ))) : <Typography type="caption">No comments to show</Typography>}
                    </CardContent>
                </Collapse>
            </Card>
        )
    };
}

export default TicketCard;