import React, { useState } from "react";

export default ({rooms, socketSend}) => {

    const [messageInputValue, setMessageInputValue] = useState("");
    /**
     * Serveix per enviar missatge a websockets
     * @param e form event que conté el missatge a enviar
     */
    const sendMessage = e => {
        e.preventDefault();

        let message = {
            room: rooms._selectedRoom,
            text: messageInputValue
        };

        socketSend(message);

        setMessageInputValue("")
    }

    console.log(rooms)
    console.log(rooms[rooms._selectedRoom])

    return(
        <div style={{
            border: "1px groove",
            padding: "20px"
        }}>
            <h1 style={{
                marginBottom: "20px"
            }}>ChatView</h1 >
            <h2 >{rooms._selectedRoom}</h2 >

            {rooms[rooms._selectedRoom].map((message, index) => (
                <li key = {index} style={{listStyleType: "none"}}>
                    <div >
                        <strong >{message.author} </strong >:
                        <em > {message.text}</em >
                    </div >
                </li >
            ))}
            <br />
            <form onSubmit = {sendMessage} >
                <input type = "text"
                       id = "message_input"
                       onChange= {event => {setMessageInputValue(event.target.value)}}
                       value = {messageInputValue}
                       placeholder = "Nou Missatge" />
                <input type = "submit"
                       value = "Enviar!" />
            </form >

        </div>
    )
}