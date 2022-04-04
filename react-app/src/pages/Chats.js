import Rooms from '../components/Rooms';
import Chat from '../components/Chat';


/**
 * Mostra els components de Rooms i de Xat, enfrentats un al costat de l'altre tal com estan a Whatsapp web o Telegram Desktop.
 * En clicar sobre una sala a l'esquerra, es mostren els missatges a la dreta.
 * En cas que el request d'accés no tingui token de sessió vàlid a les cookies, redirecciona a /login (pàgina és privada).
 * @returns 
 */

// TODO implemetació
// TODO (caldrà fer wiring d'actualització d'estat de la sala seleccionada)(useState?)

const ChatsPage = () => {
    return (
      <div>
        <Rooms></Rooms>
        <Chat></Chat>
      </div>

    );
  };
  
  export default ChatsPage;
  