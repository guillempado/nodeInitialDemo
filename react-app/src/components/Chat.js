import { Form, Button, Row, Col } from "react-bootstrap";
import socketIOClient from "socket.io-client";
// TODO websockets

/**
 * Component de Xat que connecta per sockets amb back i mostra els missatges
 * Conté un formulari fix al final (a baix de tot) per escriure i enviar missatges
 * Els missatges es mostren en espai scrollable per poder-ne llegir tot l'historial
 * El component es mostra en panell dret de pàgina de xats
 * @returns
 */

const Chat = () => {
  const socket = socketIOClient("http://localhost:80");

  socket.on("messages", (data) => {
    render(data);
  });

  const render = (data) => {
    var html = data
      .map(function (elem, index) {
        return `<div>
                <strong>${elem.author}</strong>: 
                <em>${elem.text}</em> </div>`;
      })
      .join(" ");

    document.getElementById("messages").innerHTML = html;
  };

  const addMessage = (e) => {
    let message = {
      author: document.getElementById("username").value,
      text: document.getElementById("message").value,
    };
    console.log(message);

    socket.emit("new-message", message);
    return false;
  };

  return (
    <div
      style={{
        "background-color": "#76f77b",
        height: "100%",
        "text-align": "center",
      }}
    >
      <h1>Nom de la sala</h1>

      <div style={{ "text-align": "left", padding: "0 5rem 0 5rem" }}>
        <Form onSubmit="addMessage(this)">
          <Row className="align-items-center" style={{ width: "100%" }}>
            <Col xs={10}>
              <Form.Control id="message" type="text" placeholder="Missatge" />
            </Col>
            <Col xs={2}>
              <Button variant="primary" type="submit">
                Enviar!
              </Button>
            </Col>
          </Row>
        </Form>
        <br />
        <div id="messages"></div>
      </div>
    </div>
  );
};

export default Chat;
