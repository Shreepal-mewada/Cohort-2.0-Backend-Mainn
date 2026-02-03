import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdesc] = useState("");
  function fetchNotes() {
    axios
      .get("http://localhost:3000/api/notes")
      .then((result) => {
        setnotes(result.data.note);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="">
      <div className="w-full bg-amber-100 p-10">
        <form
          className="flex gap-3 justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:3000/api/notes", {
                title,
                description,
              })
              .then((res) => {
                console.log(res.data);
                fetchNotes();
              })
              .catch((err) => console.log(err));
            settitle("");
            setdesc("");
          }}
        >
          <input
            type="text"
            name=""
            id=""
            value={title}
            placeholder="Enter your note title"
            className="border p-2"
            onChange={(e) => [settitle(e.target.value)]}
          />
          <br />
          <br />
          <input
            type="text"
            name=""
            id=""
            value={description}
            placeholder="Enter your note description"
            className="border p-2"
            onChange={(e) => [setdesc(e.target.value)]}
          ></input>
          <br />
          <br />
          <button className="bg-blue-500 text-white px-3 py-2 rounded">
            Add Note
          </button>
        </form>
      </div>
      <div className="px-20 py-3 flex gap-10 w-full flex-wrap items-center ">
         {notes.length > 0 &&
          notes.map((note) => (
            <div key={note._id} className="border p-5 w-60 shadow-lg">
              <h3 className="font-bold text-lg">{note.title}</h3>
              <p>{note.description}</p>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded mt-3"
                onClick={() => {
                  axios
                    .delete(`http://localhost:3000/api/notes/${note._id}`)
                    .then((res) => {
                      console.log(res.data);
                      fetchNotes();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Delete Note
              </button>
            </div>
          ))} 
      </div>
    </div>
  );
}

export default App;
