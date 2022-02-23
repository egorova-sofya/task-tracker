import { useAppDispatch } from "hooks/redux-hooks";
import { useAuth } from "hooks/useAuth";
import { Navigate } from "react-router-dom";
import { removeUser } from "store/slices/userSlice";

const HomePage = () => {
  const { isAuth, email } = useAuth();
  const dispatch = useAppDispatch();

  return isAuth ? (
    <div>
      <h1>Welcome</h1>
      <button
        onClick={() => {
          dispatch(removeUser());
        }}
      >
        Log out from {email}
      </button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
