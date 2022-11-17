import React, { useEffect, useState } from "react";

const UsuarisConnectats = ({rooms}) => {
    // Per React Dev Tools
    UsuarisConnectats.displayName = "UsuarisConnectats";

    const users_per_room = rooms._users_per_room
    console.log("Usuaris")
    console.log(users_per_room)

    const users = [];
    for (const user in users_per_room) {
        if(users_per_room[user] === rooms._selectedRoom)
            users.push(user)
    }

    return(
        <div
            style={{
                border: "1px groove",
                padding: "20px"
            }}
        >
            <h1 style={{
                marginBottom: "20px"
            }}>Usuaris connectats</h1 >
            <h2 >{rooms._selectedRoom in rooms && rooms._selectedRoom}</h2 >

            {users.length > 0 && users.map((user, index) => (
                <li key = {index} style={{listStyleType: "none"}}>
                    <div >
                        {user}
                    </div >
                </li >
            )) }
            <br />

        </div>
    )
}

export default UsuarisConnectats;