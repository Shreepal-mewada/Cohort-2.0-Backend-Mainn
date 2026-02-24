import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../src/features/auth/pages/Login";
import Register from "../src/features/auth/pages/Register";
import Allpost from "./features/post/components/Allpost";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Allpost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
