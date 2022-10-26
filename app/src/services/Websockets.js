import { io } from "socket.io-client";
const ENDPOINT = "localhost:3000/";

const connect = async token => {
    return await io(ENDPOINT, { auth: { token } });
}



export default {connect}