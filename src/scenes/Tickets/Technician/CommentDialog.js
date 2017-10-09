import React, { Component } from 'react';
import { apiurl } from '../../../services/constants';
import Button from 'material-ui/Button';
import Dialog, {DialogTitle, DialogActions} from 'material-ui/Dialog';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
    onContentStateChange = (contentState) => {console.log(contentState); this.setState({contentState});}

    //Handle when a user submits the comment
    handleSubmit = (state) => {
	console.log(JSON.stringify(this.state.contentState, null, 4));
        var formData = new FormData();
        formData.append('ticket_id', this.props.ticket.id);
        formData.append('text', this.state.contentState.blocks[0].text);
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
    
    render() {
	const { contentState } = this.state.contentState;
	return (
	    <div>
	      <br/>
	      <Button onClick={this.handleAddComment}>Add Comment</Button>
	      <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
		<DialogTitle>New Comment</DialogTitle>
		<Editor onContentStateChange={this.onContentStateChange}/>
		<Button onClick={() => this.handleSubmit(contentState)} color="primary">Submit</Button>
	      </Dialog>
	    </div>
	    
	);
    }
}

export default CommentDialog;
