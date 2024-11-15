import { useState } from "react";
import NoteCard from "./components/NoteCard"
import { FaPencilAlt } from "react-icons/fa";

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

  return (
    <>
      <div className="navbar bg-base-200 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">memo.io</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
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
      <button onClick={handleAddNote} className="btn bg-base-200 flex fixed bottom-10 right-10 shadow-md h-20 w-20 rounded-full justify-center items-center">
        <FaPencilAlt />
      </button>
    </>
  )
}

export default App

