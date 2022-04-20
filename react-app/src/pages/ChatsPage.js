import Rooms from "../components/Rooms";
import Chat from "../components/Chat";
import {Col, Row, Container} from 'react-bootstrap';

/**
 * Mostra els components de Rooms i de Xat, enfrentats un al costat de l'altre tal com estan a Whatsapp web o Telegram Desktop.
 * En clicar sobre una sala a l'esquerra, es mostren els missatges a la dreta.
 * En cas que el request d'accés no tingui token de sessió vàlid a les cookies, redirecciona a /login (pàgina és privada).
 * @returns
 */

// TODO (caldrà fer wiring d'actualització d'estat de la sala seleccionada)(useState?)

const ChatsPage = () => {
  // padding = 0, gutter = 0
  return (
      <Row style={{height: "100%"}}>
      <Col xs={{ span: 3 }}>
        {/*Components react no introdueixen div de component, cal posar css classes a div arrel DE DINS del component, className aquí no fa res*/}
        <Rooms />
      </Col>
      <Col xs={9}>
        <Chat />
      </Col>
    </Row>
  );
};

export default ChatsPage;
