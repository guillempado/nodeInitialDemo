import {Navbar, Nav, Container} from 'react-bootstrap';

const NavBar = () => {
  return (
<Navbar bg="success" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="/">ChatsApp</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav className="justify-content-end">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/user">User</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default NavBar;
