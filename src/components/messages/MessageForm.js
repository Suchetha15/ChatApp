import React, { Component } from 'react';
import moment from 'moment';

class MessageForm extends Component {
    render() {
        return (
            <div>
               <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" className="form-control" ref="text" placeholder="Please type a message.. "/>
               </form>
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        var cTime = new moment();
        cTime = cTime.format("HH:mm:ss");
        this.props.emit('messageAdded', {
            timeStamp: cTime,
            text: this.refs.text.value.trim(),
            user: this.props.user.name
        });
        this.refs.text.value = '';
    }
}

export default MessageForm;