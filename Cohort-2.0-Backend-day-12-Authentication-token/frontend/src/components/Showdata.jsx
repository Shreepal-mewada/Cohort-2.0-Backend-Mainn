import React, { useEffect, useState } from "react";
import axios from "axios";

function Showdata() {
  const [data, setdata] = useState(["Loading data....."]);
  function fetchNotes() {
    axios
      .get("http://localhost:3000/api/auth/register")
      .then((result) => {
        setdata(result.data.users);
        console.log(result.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-full bg-amber-100 p-10 flex flex-col gap-3">
      {data.map((item, id) => (
        <div
          key={id}
          className="flex gap-1 justify-center items-center flex-col bg-amber-200 p-3 rounded-lg"
        >
          <h1>{item.username}</h1>
          <h5>{item.email}</h5>
          <h5>{item.password}</h5>
        </div>
      ))}
    </div>
  );
}

export default Showdata;
