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
        this.loadMore = this.loadMore.bind(this);

        // Estat de l'app de xats
        this.state = {
            // TODO fer selectedRoom dinàmic
            // TODO en el moment que es crei un room de manera dinàmica, caldrà crear l'entrada tmb al diccionari de manera que no doni error.
            // TODO Tip: els keys de l'objecte de room són els que caldrà renderitzar al menú de rooms
            // DECISIÓ DE DISSENY: Rooms directament vessats a state per poder-los actualitzar separadament
            "Room 1": [],  // tenen nom únic -> cada sala és un key, el valor : {lastRead: <timestamp>, messages: []}, on message = {author, text, timestamp}
            _selectedRoom: "Room 1"  // El nom del selected chat
        };

        console.log(this.state[this.state._selectedRoom])

    }

    /*
     async componentDidUpdate(prevProps, prevState, snapshot){

     }
     */

    // Connecta i carrega historial de missatges
    async componentDidMount() {

        // Valida que tens token
        if (User.token === "")
            this.props.router.navigate("/login");

        // Connect
        this.socket = await ws.connect(User.token);
        console.log(this.socket)
        // TODO gestió d'errors de connexió (try/catch?)

        // PROVA PER WEBSOCKETS

        // Load historical
        this.socket.on('historical', rooms => {
            this.setState({ ...rooms, _selectedRoom: "Room 1" } )
        });

        // Carrega missatges nous quan passin
        this.socket.on('new_server_message', data => {
            console.log("new server message:")
            console.log(data)
            let message = {
                author: data.author,
                text: data.text
            }

            let room = [];

            if(data.room in this.state)
                room = [...(this.state[data.room])]

            room.push(message)

            let roomName = data.room;

            // DEBUG: CAL POSAR ROOMNAME ENTRE [] PERQUÈ SINÓ POSA LITERALMENT 'ROOMNAME' (des de 2021: https://stackoverflow.com/a/11508490)
            this.setState({
                [roomName]: room
            })

            console.log(this.state)
        });

        this.socket.on('new_room', room => {
            this.setState({[room]: []})
        });
    }

    /*
     // Tanca socket en desinicialització
     async componentWillUnmount() {
     this.socket.disconnect();
     }
     */
    /**
     * Serveix per enviar missatge a websockets
     * @param subject el concepte d'emissió
     * @param data les dades
     */
    socketSend = (subject, data) => {
        this.socket.emit(subject, data);
    }

    /**
     * Serveix per carregar més missatges a mesura que es tira enrera en el xat sota demanda
     * @param room
     */
    loadMore = room => {
        // TODO get(room, fromTime, n = 30)
    }

    selectRoom = room => {
        console.log(`Selected room: ${room}`)
        this.setState({_selectedRoom: room})
    }

    render = () => {
        return (
            <div style={{
                padding: "40px"
            }} >
                <h1 >ChatsController</h1 >
                <p >Aquest és el component ChatsController</p >
                <RomsView rooms = {this.state}
                          selectRoom = {this.selectRoom}
                          socketSend = {this.socketSend}/>
                <ChatView rooms = {this.state}
                          socketSend = {this.socketSend} />
            </div >
        );
    }
}

export default withRouter(ChatsController);