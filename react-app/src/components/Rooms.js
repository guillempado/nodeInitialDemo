import Lorem from "./MontyPythonLorem";
import { Form, Button, Row, Col } from "react-bootstrap";

// TODO websockets

/**
 * Component de sales que es connecta per sockets a back i mostra les sales disponibles
 * Permet accedir a subcomponent per crear una sala nova
 * Les sales es mostren en espai scrollable per poder explorar-es totes
 * El component es mostra en panell esquerra de la pàgina de xats
 * @returns
 */

const Rooms = () => {
  return (
    <div>
      <h1 style={{ "text-align": "center" }}>Sales</h1>

      <Form action="/rooms" method="POST">
        <Row className="align-items-center" style={{ width: "100%" }}>
          <Col xs={8}>
            <Form.Control id="newRoomName" type="text" name="newRoomName"
          placeholder="Nova sala" />
          </Col>
          <Col xs={4}>
            <Button variant="primary" type="submit">
              Crea
            </Button>
          </Col>
        </Row>
      </Form>

      <br />
      <a> Room 1</a>
      <br />
      <a> Room 2</a>
      <br />
      <a> Room 3</a>
      <br />
      <a> Room 4</a>
      <br />
      <br />
      <br />
      <Lorem />
    </div>
  );
};

export default Rooms;
