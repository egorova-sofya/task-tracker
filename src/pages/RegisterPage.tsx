import SignUp from "components/SignUp";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <h1>RegisterPage</h1>
      <SignUp />
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </>
  );
};

export default RegisterPage;
