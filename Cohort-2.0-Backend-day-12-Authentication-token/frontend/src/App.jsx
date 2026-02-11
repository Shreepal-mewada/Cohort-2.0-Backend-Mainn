import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Showdata from "./components/Showdata";
function App() {
  return (
    <div>
      <div className=" flex flex-col gap-4">
        <Link
          className="bg-blue-400 px-4 py-2 mt-3 rounded-xl text-white"
          to="/login"
        >
          Login
        </Link>

        <Link
          className="bg-blue-400 px-4 py-2 rounded-xl  text-white"
          to="/showdata"
        >
          Show Data
        </Link>

        <Routes>
          <Route path="/showdata" element={<Showdata />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
