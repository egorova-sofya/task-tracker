import { setUser } from "store/slices/userSlice";
import Form from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/redux-hooks";

interface UserI {
  email: string;
  id: string;
  token: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlLogin: (email: string, password: string) => void = (
    email,
    password
  ) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        alert("invalid user");
      });
  };

  return (
    <div>
      <Form title="sign in" handleClick={handlLogin} />
    </div>
  );
};

export default Login;
