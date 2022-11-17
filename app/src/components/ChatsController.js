import React, { Component, useState } from "react";
import { withRouter } from '../common/with-router';
import RomsView from './RomsView';
import ChatView from './ChatView';
import ws from "../services/Websockets";
import User from "../common/User";
import UsuarisConnectats from "./UsuarisConnectats";

class ChatsController extends Component {

    constructor(props) {
        super(props);

        // Method bindings
        this.loadMore = this.loadMore.bind(this);
        this.logout = this.logout.bind(this);

        // Estat de l'app de xats
        this.state = {
            // DECISIÓ DE DISSENY: Rooms directament vessats a state per poder-los actualitzar separadament
            _selectedRoom: "",  // El nom del selected chat
            _users_per_room: {}
        };

        console.log(this.state[this.state._selectedRoom])

    }

    // Connecta i carrega historial de missatges
    async componentDidMount() {

        // Valida que tens token
        if (User.token === "") {

            // Si no existeix carrega de local storage
            const token = window.localStorage.getItem("token");

            // Si no s'ha recuperat res de local storage, torna a pàgina de login
            if (token === undefined || token === null || token === "") {
                this.props.router.navigate("/login");
                window.location.reload();
            }

            User.token = token
        }

        // Connect
        this.socket = await ws.connect(User.token);
        console.log(this.socket)
        // TODO gestió d'errors de connexió (try/catch?)

        // Load historical
        this.socket.on('historical', rooms => {

            // Selecciona primera sala perquè view de missatges no aparegui en blanc
            let _selectedRoom = "";
            for (const room of Object.keys(rooms)) {
                if (room[0] !== '_') {
                    _selectedRoom = room;
                    break;
                }
            }

            // Desa historical
            this.setState({
                ...rooms,
                _selectedRoom
            })
        });

        // Carrega cache de sales seleccionades per usuari
        this.socket.on('selected_rooms_cache', users_per_room => {
            this.setState({ _users_per_room: users_per_room })
        });

        // Carrega missatges nous quan passin
        this.socket.on('new_server_message', data => {
            console.log("new server message:")
            console.log(data)
            let message = {
                author: data.author,
                text: data.text,
                ts: data.ts
            }

            let room = [];

            if (data.room in this.state)
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
            this.setState({ [room]: [] })
        });

        // Actualitza usuaris per sala
        this.socket.on('new_SelectedRoom', async data => {
            console.log(`new_SelectedRoom: user: ${data.user}, room: ${data.selectedRoom}`)
            const new_users_per_room = {...this.state._users_per_room}
            new_users_per_room[data.user] = data.selectedRoom
            this.setState({ _users_per_room: new_users_per_room })
        })
    }

    // Envia event a servidor quan client canvii de sala seleccionada
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState._selectedRoom !== this.state._selectedRoom) {
            console.log("Nova sala seleccionada")
            this.socketSend("selected_room_change", { selectedRoom: this.state._selectedRoom })
        }
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
        this.setState({ _selectedRoom: room })
    }

    logout = () => {
        localStorage.removeItem("token")
        this.props.router.navigate("/login");
    }

    render = () => {
        return (
            <div style = {{
                padding: "40px"
            }} >
                <div className = "row" >
                    <h1 className = "col-sm-10" >ChatsController</h1 >
                    <button type = "button"
                            className = "btn btn-primary col-sm-2"
                            onClick = {this.logout} >Logout
                    </button >
                </div >
                <p >Aquest és el component ChatsController</p >
                <RomsView rooms = {this.state}
                          selectRoom = {this.selectRoom}
                          socketSend = {this.socketSend} />
                <UsuarisConnectats rooms = {this.state} />
                <ChatView rooms = {this.state}
                          socketSend = {this.socketSend} />
            </div >
        );
    }
}

export default withRouter(ChatsController);