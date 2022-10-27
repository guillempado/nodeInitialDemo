import React, { useEffect, useState } from "react";

const RoomsView = ({rooms, selectRoom, socketSend}) => {

    // Per React Dev Tools
    RoomsView.displayName = "RoomsView";

    const [roomInputValue, setRoomInputValue] = useState("");

    const sendRoom = e => {
        e.preventDefault();
        console.log(roomInputValue)

        socketSend('new_room', roomInputValue);

        // Navega a nova sala creada: No està disponible al moment però ara ChatsView fa re-render de sortida de room actual i quan arribi  farà rerender amb nova sala. Tenint-ho tot en localhost gairebé no es percep, potser si tardés ~2 segons caldria configurar ChatsView pq mostri pantalla de loading mentrestant?
        selectRoom(roomInputValue)
        setRoomInputValue("")
    }

    return(
        <div style={{
            border: "1px groove",
            padding: "20px"
        }}>
            <h1 style={{
                marginBottom: "20px"
            }}>RoomsView</h1 >
            {Object.keys(rooms).filter(room => room[0] !== '_').map((room, index) => (
                <li key = {index} style={{listStyleType: "none"}}>
                    <div >
                        <strong onClick={e => selectRoom(e.target.innerText)}>{ room } </strong >
                    </div >
                </li >
            ))}
            <br />
            <form onSubmit = {sendRoom} >
                <input type = "text"
                       id = "newRoomInput"
                       onChange= {event => {setRoomInputValue(event.target.value)}}
                       value = {roomInputValue}
                       placeholder = "Crea sala nova..."
                       required
                />
                <input type = "submit"
                       value = "Enviar!" />
            </form >
        </div>
    )
}

export default RoomsView;