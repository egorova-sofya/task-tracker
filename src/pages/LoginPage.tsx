import Login from "components/Login";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <h1>LoginPage</h1>
      <Login />
      <p>
        Or <Link to="/register">register</Link>
        Or <Link to="/">home</Link>
      </p>
    </>
  );
};

export default LoginPage;
