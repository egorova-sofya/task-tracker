import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import TodoPage from "pages/TodoPage";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="todo" element={<TodoPage />} />
      </Routes>
    </div>
  );
};

export default App;
