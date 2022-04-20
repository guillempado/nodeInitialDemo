import Lorem from "./MontyPythonLorem";

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
        <h1
          style={{ "text-align": "center" }}
        >
          Rooms
        </h1>
      <h3> Create new room form </h3>
      <br/>
      <a> Room 1</a><br/>
      <a> Room 2</a><br/>
      <a> Room 3</a><br/>
      <a> Room 4</a><br/>
      <br/><br/>
      <Lorem />
    </div>
  );
};

export default Rooms;
