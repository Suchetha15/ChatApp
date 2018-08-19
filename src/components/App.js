import React, { Component } from 'react';
//import ReactDOM from 'react-dom' ;
import io from 'socket.io-client';
import MessageList from './messages/MessageList';
import MessageForm from './messages/MessageForm';
//import UserForm from './users/UserForm';
import UserList from './users/UserList';
import UserForm from './users/UserForm';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'disconnected',
            messages: [{
                timeStamp: Date.now(),
                text: "Welcome to SockChat"
            }],
            users: [],
            user: ''
        }
    }

    componentWillMount(){
        this.socket = io(window.location.hostname);
        this.socket.on('connect', this.connect.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
        this.socket.on('messageAdded', this.onMessageAdded.bind(this));
        this.socket.on('userJoined', this.onUserJoined.bind(this));
    }

    connect(){
        this.setState({status: 'connected'});
        console.log('Connected: ' + this.socket.id);
    }
    
    onMessageAdded(message){
        this.setState({messages: this.state.messages.concat(message)});  
    }

    emit(eventName, payload){
        this.socket.emit(eventName, payload);
    }

    onUserJoined(users) {
        this.setState({users: users});
    }

    setUser(user) {
        this.setState({user: user});
    }

    disconnect(users){
        this.setState({status: 'disconnect', users: users});
    }

    render() {
        if(this.state.user == ''){
            return (
                <UserForm emit={this.emit.bind(this)} setUser={this.setUser.bind(this)}/>
            )
        } else{
            return (
                <div className="row">
                    <div className="col-md-4">
                        <UserList {...this.state}/>
                    </div>
                    <div className="col-md-8">
                        <MessageList {...this.state}  />
                        <MessageForm {...this.state} emit={this.emit.bind(this)}/>
                    </div>
                </div>
            );
        }
        
    }
}

export default App;

 

    