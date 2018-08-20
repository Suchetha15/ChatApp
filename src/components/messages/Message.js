import React, { Component } from 'react';


class Message extends Component {
    render() {
        const {message} = this.props;
        //var formattedTime = this.formatTime(message.timeStamp);
        return (
            <div className="message">
                <strong>{message.user}</strong>

               {message.timeStamp} - {message.text}
            </div>
           
        );
    }
    formatTime(timestamp){
        var dt = new Date (timestamp * 1000);
        var hrs = dt.getHours();
        var mins = dt.getMinutes();
        var seconds = dt.getSeconds();

        if(hrs < 10){
            hrs = '0' + hrs;
        }
        if(mins < 10){
            mins = '0' + mins;
        }
        if(seconds < 10){
            seconds = '0' + seconds;
        }

        return hrs+":"+mins+":"+seconds;
    }
}

export default Message;

 

    