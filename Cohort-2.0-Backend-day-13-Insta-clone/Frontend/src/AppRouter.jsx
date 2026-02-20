import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../src/features/auth/pages/Login";
import Register from "../src/features/auth/pages/Register";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
