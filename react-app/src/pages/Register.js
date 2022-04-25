const Register = () => {
  return (
    <div style={{ "text-align": "center" }}>
      <h1>Register</h1>
      <br />

      <div id="errorMessage"></div>

      <form action="/register" method="POST">
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
