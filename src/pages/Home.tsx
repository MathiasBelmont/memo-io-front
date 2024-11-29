import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { FaMoon, FaPencil, FaSun } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import NotesAPI from "../utils/NotesAPI";

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<any[]>([]);

  const fetchNotes = async () => {
    try {
      const data = await NotesAPI.getAll();
      if (data) {
        setNotes(data);
        console.log(data);
      }          
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  
  useEffect(() => {
    fetchNotes();
    const intervalId = setInterval(fetchNotes, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: "Nova Nota",
      note: "",
      image: "",
      alt: "",
      color: "gray",
    };
    setNotes([...notes, newNote]);
  };

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="navbar bg-base-300 fixed top-0 left-0 right-0 z-50 drop-shadow-lg">
        <div className="navbar-start">
          <button onClick={handleLogout} className="btn btn-ghost btn-circle">
            Sair
          </button>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">memo.io</a>
        </div>
        <div className="navbar-end">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center pt-16">
        <div className="grid grid-cols-3 gap-10 p-10">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              createdAt={note.createdAt}
              title={note.title}
              content={note.content}
              color={note.color}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleAddNote}
        className="btn bg-base-200 flex fixed bottom-10 right-10 shadow-md btn-lg rounded-full justify-center items-center"
      >
        <FaPencil />
      </button>
    </>
  );
}
