import { Container } from "react-bootstrap";

const Login = () => {
  return (
    <div style={{ "text-align": "center" }}>
      <h1>Login</h1>
      <br />

      <form action="/login" method="POST">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
        <br />
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <br />
        <br />
        <input type="submit" value="Log in" />
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
      <p>
        Or enter using{" "}
        <a href="https://support.google.com/accounts/answer/112802?hl=en&co=GENIE.Platform%3DDesktop">
          Google Auth
        </a>
      </p>
    </div>
  );
};

export default Login;
