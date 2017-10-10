import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { apiurl } from '../../../services/constants';
import Button from 'material-ui/Button';
import Dialog, {DialogTitle, DialogActions} from 'material-ui/Dialog';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './CommentDialogStyle';

class CommentDialog extends Component {
    constructor (props) {
	super(props);
	this.state = {
	    //Stores if the dialog is open
	    open: false,
	    //State of the wysiwyg editor
	    contentState: {}
	};
    }

    //Handle when the add comment button is pressed
    handleAddComment = () => {this.setState({open: true});}

    //Handle close requests made to the dialog
    handleRequestClose = () => {this.setState({open: false});}

    //Handle when the user types into the Editor
    onContentStateChange = (contentState) => {this.setState({contentState});}

    //Handle when a user submits the comment
    handleSubmit = (state) => {
	const text = this.getCommentText(this.state.contentState);
        var formData = new FormData();
        formData.append('ticket_id', this.props.ticket.id);
	formData.append('text', text);
	formData.append('staff_id', this.props.staffid);
	formData.append('user_id', "");
        //Posts the uid to the API
        fetch(apiurl + '/comments', {
            method:'POST',
            body:formData
        })
            .then((response) => console.log(response.json()))
            .catch((error) => {console.log(error);});

	this.setState({open: false});
	
        //Delay to wait for API
        setTimeout(this.props.getComments, 1000);

    }

    //Loops over the given contentState and appends all text together for storage
    getCommentText = (contentState) => {
	let allText = "";
	if(contentState.blocks == undefined) return ""; 
	contentState.blocks.forEach((block) => {
	    allText += " " + block.text;
	});
	return allText;
    }
    

    render() {
	const classes = this.props.classes;
	const { contentState } = this.state.contentState;
	return (
	    <div>
	      <br/>
	      <Button onClick={this.handleAddComment}>Add Comment</Button>
	      <Dialog open={this.state.open}
		      onRequestClose={this.handleRequestClose}>
		<DialogTitle>New Comment</DialogTitle>
		<div className={classes.dialog}>
		  <Editor onContentStateChange={this.onContentStateChange}/>
		</div>
		<Button onClick={() => this.handleSubmit(contentState)} color="primary">Submit</Button>
	      </Dialog>
	    </div>
	    
	);
    }
}

//Addsthe classes for styling
CommentDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentDialog);
