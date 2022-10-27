import React, { useState } from "react";

const ChatView = ({rooms, socketSend}) => {
    // Per React Dev Tools
    ChatView.displayName = "ChatView";

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

        socketSend('new_client_message', message);

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
            <h2 >{rooms._selectedRoom in rooms && rooms._selectedRoom}</h2 >

            {rooms._selectedRoom in rooms && rooms[rooms._selectedRoom].map((message, index) => (
                <li key = {index} style={{listStyleType: "none"}}>
                    <div >
                        <em > {new Date(message.ts).toLocaleTimeString()} - </em >
                        <strong >{message.author} </strong >:
                        <em > {message.text}</em >
                    </div >
                </li >
            ))}
            <br />
            {rooms._selectedRoom in rooms && (
                <form onSubmit = {sendMessage} >
                    <input type = "text"
                        id = "message_input"
                        onChange= {event => {setMessageInputValue(event.target.value)}}
                        value = {messageInputValue}
                        placeholder = "Nou Missatge"
                        required
                    />
                    <input type = "submit"
                        value = "Enviar!" />
                </form >
            )}
        </div>
    )
}

export default ChatView;