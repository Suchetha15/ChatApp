import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
    render() {
        return (
            <div className="well">
                <h3>Messages</h3>
                {
                    this.props.messages.map((message, i) => {
                        return <Message message={message} user={this.props.user} key={i} />
                    })
                }
               
            </div>
        );
    }
}

export default MessageList;

 

    