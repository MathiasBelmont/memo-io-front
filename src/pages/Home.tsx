import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { FaArrowRightFromBracket, FaMoon, FaPencil, FaSun } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import NotesAPI from "../utils/NotesAPI";
import NoteModal from "../components/NoteModal";

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<any[]>([]);
  const [theme, setTheme] = useState("light");

  // UseEffect para redirecionar para página de login caso o usuário não esteja logado
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  // Função para obter as notas do backend
  const fetchNotes = async () => {
    try {
      const user = localStorage.getItem("user");
      const id = JSON.parse(user!).id;
      const data = await NotesAPI.getByAuthor(id);
      if (data) {
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes by author:', error);
    }
  };

  // UseEffect para buscar as notas
  useEffect(() => {
    fetchNotes();
  }, []);

  // Função para sair da conta
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Função para adicionar uma nova nota
  const handleAddNote = async () => {
    try {
      const user = localStorage.getItem("user");
      const id = JSON.parse(user!).id;
      const noteData = {
        title: "Nova nota",
        content: "",
        color: "bg-yellow-100",
        authorId: id,
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

      {localStorage.getItem("user") && (
        <>
          {/* Barra de navegação */}
          <div className="navbar bg-base-300 fixed top-0 left-0 right-0 z-50 drop-shadow-lg">

            {/* Alternador de tema */}
            <div className="navbar-start">
              <button onClick={toggleTheme} className="btn btn-ghost btn-circle" >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>
            </div>

            {/* Logo */}
            <button className="btn btn-ghost text-xl" onClick={() => {
              const modal = document.getElementById('modal_info') as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}>memo.io</button>

            {/* Perfil */}
            <div className="navbar-end">
              <details className="dropdown dropdown-end">
                <summary tabIndex={0} role="button" className="btn btn-primary text-white rounded-full">
                  <span className="text-2xl">{JSON.parse(localStorage.getItem('user') || '{}').name[0]}</span>
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-60 p-2 m-1 shadow">
                  <li className="p-2">
                    {JSON.parse(localStorage.getItem('user') || '{}').name}
                    <br />
                    {JSON.parse(localStorage.getItem('user') || '{}').email}
                  </li>
                  <hr />
                  <li>
                    <a className="text-error" onClick={handleLogout}><FaArrowRightFromBracket />Sair</a>
                  </li>
                </ul>
              </details>
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

          {/* Botão para adicionar uma nova nota */}
          <button
            onClick={handleAddNote}
            className="btn bg-base-200 flex fixed bottom-10 right-10 shadow-md btn-lg rounded-full justify-center items-center"
          >
            <FaPencil />
          </button>

          <dialog id="modal_info" className="modal">
            <div className="modal-box flex flex-col justify-center items-center text-center">
              <h3 className="font-semibold text-2xl">memo.io</h3>
              <p className="text-sm">v0.0.1</p>
              <p className="text-sm py-4">Fortran Crusaders, 2024</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      )}

    </>
  );
}
