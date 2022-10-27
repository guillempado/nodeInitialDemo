import React, { useState } from "react";

export default ({rooms, selectRoom, socketSend}) => {

    const [roomInputValue, setRoomInputValue] = useState("");

    const sendRoom = e => {
        e.preventDefault();
        console.log(roomInputValue)
        socketSend('new_room', roomInputValue);
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