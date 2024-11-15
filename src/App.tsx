import { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard"
import { FaMoon, FaPencilAlt, FaSun } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Ideias para um Projeto de Arte",
      note: `
        Explorar a combina o de materiais recicl veis com pintura.
        Criar uma instala o que represente a polui o dos oceanos.
        Usar luzes LED para dar vida s obras  noite.
      `,
      image: "/img/image1.jpeg",
      alt: "Tarefas",
      color: "red",
    },
    {
      id: 2,
      title: "Dicas de Produtividade",
      note: `
        Estabelecer metas di rias e semanais.
        Utilizar a t cnica Pomodoro: 25 minutos de trabalho, 5 minutos de pausa.
        Desconectar-se das redes sociais durante o hor rio de trabalho.
      `,
      image: "/img/image2.jpeg",
      alt: "Tarefas",
      color: "green",
    },
    {
      id: 3,
      title: "Receitas para Experimentar",
      note: `
        Smoothie Verde: Espinafre, banana, abacate e leite de am ndoas.
        Salada de Quinoa: Quinoa, tomate-cereja, pepino, cebola roxa e molho de lim o.
        Bolo de Cenoura: Cenoura ralada, farinha integral, mel e especiarias.
      `,
      image: "/img/image3.jpeg",
      alt: "Tarefas",
      color: "blue",
    },
  ]);

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

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <div className="navbar bg-base-300 fixed top-0 left-0 right-0 z-50 drop-shadow-lg">
        <div className="navbar-start">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">memo.io</a>
        </div>
        <div className="navbar-end">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
      <div className="flex justify-items-start min-h-screen gap-12 flex-wrap py-24 px-16 bg-base-100">
        {notes.map(note => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            note={note.note}
            image={note.image}
            alt={note.alt}
            color={note.color}
          />
        ))}
      </div>
      <button onClick={handleAddNote} className="btn bg-base-200 flex fixed bottom-10 right-10 shadow-md btn-lg rounded-full justify-center items-center">
        <FaPencilAlt />
      </button>
    </>
  )
}

export default App

