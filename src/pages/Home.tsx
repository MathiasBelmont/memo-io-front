import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { FaMoon, FaPencil, FaSun } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import NotesAPI from "../utils/NotesAPI";
import NoteModal from "../components/NoteModal";

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<any[]>([]);
  const [theme, setTheme] = useState("light");

  // Função para obter as notas do backend
  const fetchNotes = async () => {
    try {
      const data = await NotesAPI.getAll();
      if (data) {
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // UseEffect para buscar as notas
  useEffect(() => {
    fetchNotes();
  }, []);

  // Função para sair da conta
  const handleLogout = () => {
    navigate("/");
  };

  // Função para adicionar uma nova nota
  const handleAddNote = async () => {
    try {
      const noteData = {
        title: "Nova nota",
        content: "",
        color: "bg-yellow-100",
        authorId: 1,
      };
      const response = await NotesAPI.create(noteData);
      if (response) {
        fetchNotes();
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // UseEffect para atualizar o tema
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>

      {/* Barra de navegação */}
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
      
      {/* Notas */}
      <div className="flex justify-center items-center pt-16">
        <div className="grid grid-cols-3 gap-10 p-10">
          {notes.sort((a, b) => a.id - b.id).map((note) => (
            <>
              <NoteCard
                key={note.id}
                id={note.id}
                createdAt={note.createdAt}
                title={note.title}
                content={note.content}
                color={note.color}
              />
              <NoteModal
                id={note.id}
                createdAt={note.createdAt}
                title={note.title}
                content={note.content}
                color={note.color}
                onUpdate={fetchNotes}
              />
            </>
          ))}
        </div>
      </div>
      
      {/* Botão para adicionar uma nova nota */}
      <button
        onClick={handleAddNote}
        className="btn bg-base-200 flex fixed bottom-10 right-10 shadow-md btn-lg rounded-full justify-center items-center"
      >
        <FaPencil />
      </button>

    </>
  );
}
