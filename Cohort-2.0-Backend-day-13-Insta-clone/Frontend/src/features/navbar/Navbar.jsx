import { useNavigate } from "react-router";


function Navbar() {
  const navigate = useNavigate();



  return (
    <div className="bg-pink-200 flex items-center justify-between py-4 px-9">
      <h1 className="text-lg font-semibold text-black">Instagram</h1>

      <div className="flex items-center gap-4">
        

        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/createpost")}
        >
          CreatePost
        </button>
      </div>
    </div>
  );
}

export default Navbar;
