import { Nav, Container, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
<Navbar bg="success" expand="lg" variant = "dark" className = "py-0">
  <Container>
    <Navbar.Brand href="/">ChatsApp</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="justify-content-end">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/user" >User</Nav.Link>
      </Nav>
  </Container>
</Navbar>
  );
};

export default NavBar;
