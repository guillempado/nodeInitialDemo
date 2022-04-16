import Lorem from "./MontyPythonLorem";

// TODO implementació

/**
 * Component de sales que es connecta per sockets a back i mostra les sales disponibles
 * Permet accedir a subcomponent per crear una sala nova
 * Les sales es mostren en espai scrollable per poder explorar-es totes
 * El component es mostra en panell esquerra de la pàgina de xats
 * @returns
 */

const Rooms = () => {
  return (
    <div className="rooms-area">
      <h1>Rooms</h1>
      <Lorem />
    </div>
  );
};

export default Rooms;
