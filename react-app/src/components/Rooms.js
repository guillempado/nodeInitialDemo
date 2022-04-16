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
      <div style={{ height: "3%" }}>
        <h1
          id="rooms-title"
          style={{ height: "100%", "background-color": "blue", color: "white" }}
        >
          Rooms
        </h1>
      </div>
      <div style={{ height: "84%", overflow: 'auto' }}>
        <Lorem />
      </div>
      <h1> Create new room</h1>
    </div>
  );
};

export default Rooms;
