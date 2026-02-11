import React, { useState } from "react";
import axios from "axios";
function App() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post("http://localhost:3000/api/auth/register", {
              username,
              email,
              password,
            })
            .then((res) => {
              console.log(res.data);
              alert(res.data.message);
            })
            .catch((err) => {
              console.log(err.response.data);
              alert(err.response.data.message);
            });

          setemail("");
          setpassword("");
          setusername("");
        }}
        className="flex flex-col"
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-2 mb-2 rounded-lg"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="border p-2 mb-2 rounded-lg"
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border p-2 mb-2 rounded-lg"
        />
        <button className="px-2 py-2 bg-blue-300 rounded-2xl" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default App;
