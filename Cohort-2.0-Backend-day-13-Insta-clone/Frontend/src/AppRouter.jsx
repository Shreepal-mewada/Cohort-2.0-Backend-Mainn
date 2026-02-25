import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../src/features/auth/pages/Login";
import Register from "../src/features/auth/pages/Register";
import Allpost from "./features/post/components/Allpost";
import CreatePost from "./features/post/components/CreatePost";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/" element={<Allpost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
