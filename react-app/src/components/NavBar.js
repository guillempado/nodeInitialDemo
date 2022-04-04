import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="NavBar">
        <nav>
          <ul>
            <li>
              <Link to="/">App</Link>
            </li>
            
            <li>
              {/* TODO mostar logout if logged in (i que acció en clicar sigui de logout) */}
              <Link to="/login">Login</Link>
            </li>
            <li>
              {/* TODO 'User' es mostra com icona d'usuari i no com a text 'User'.
                  TODO Quan hi hagi avatar d'usuari, mostrar l'avatar en comptes de l'icona (si usuari no ha canviat, tindrà l'avatar per defecte, que ja haurà de recordar a una icona d'usuari igualment).
              */}
              <Link to="/user">User</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default NavBar;