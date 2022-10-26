import React, { Component } from "react";
import { withRouter } from '../common/with-router';
import RomsView from './RomsView';
import ChatView from './ChatView';
import ws from "../services/Websockets";
import User from "../common/User";

class ChatsController extends Component {

    constructor(props) {
        super(props);

        // Method bindings
        this.sendMessage = this.sendMessage.bind(this);
        this.loadMore = this.loadMore.bind(this);

        // Estat de l'app de xats
        this.state = {
            /*
             rooms: {},  // tenen nom únic -> cada sala és un key, el valor : {lastRead: <timestamp>, messages: []}, on message = {author, text, timestamp}
             selected: ""  // El nom del selected chat
             */
            messages: [],  // De moment faig un sol room
            message: ""
        };
    }

    /*
     async componentDidUpdate(prevProps, prevState, snapshot){

     }
     */

    // Connecta i carrega historial de missatges
    async componentDidMount() {

        // Valida que tens token
        if (this.props.token === null || this.props.token.length === 0)
            this.props.router.navigate("/login");

        // Connect
        this.socket = await ws.connect(this.props.token);
        console.log(this.socket)
        // TODO gestió d'errors de connexió (try/catch?)

        // PROVA PER WEBSOCKETS

        // Load historical
        this.socket.on('messages', messages => {
            this.setState({ messages })
            console.log(messages)
        });



    }
/*
    // Tanca socket en desinicialització
    async componentWillUnmount() {
        this.socket.disconnect();
    }
 */

    /**
     * Serveix per carregar més missatges a mesura que es tira enrera en el xat sota demanda
     * @param room
     */
    loadMore = room => {
        // TODO get(room, fromTime, n = 30)
    }

    /**
     * Serveix per enviar missatge a websockets
     * @param e form event que conté el missatge a enviar
     */
    sendMessage = e => {
        e.preventDefault();

        let message = {
            author: User.name,
            text: this.state.message
        };

        this.socket.emit('new-message', message);

        this.setState({message: ""})


        // TODO adaptar a multirooms -- send(room, message) -- Caldrà enviar token per recuperar l'author al servidor i q no es pugui hackejar
    }

    render = () => {
        return (
            <div >
                <h1 >ChatsController</h1 >
                <p >Aquest és el component ChatsController</p >
                <RomsView />
                <ChatView />

                {/* PROVA PER WEBSOCKETS */}
                <h1 >My App</h1 >

                {this.state.messages.map((message, index) => (
                    <li key = {index} style={{listStyleType: "none"}}>
                        <div >
                            <strong >{message.author} </strong >:
                            <em > {message.text}</em >
                        </div >
                    </li >
                ))}
                <br />
                <form onSubmit = {this.sendMessage} >
                    <input type = "text"
                           id = "message_input"
                           onChange= {event => {this.setState({message: event.target.value})}}
                           value = {this.state.message}
                           placeholder = "Nou Missatge" />
                    <input type = "submit"
                           value = "Enviar!" />
                </form >
            </div >
        );
    }
}

export default withRouter(ChatsController);