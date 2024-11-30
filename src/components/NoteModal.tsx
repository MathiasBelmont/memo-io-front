import { useState, useEffect, Fragment } from "react";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import NotesAPI from "../utils/NotesAPI";

interface NoteProps {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  color: string;
}

export default function NoteModal(props: NoteProps) {
  const [color, setColor] = useState(
    props.color === "yellow"
      ? `bg-yellow-100`
      : props.color === "red"
        ? `bg-red-100`
        : props.color === "blue"
          ? `bg-blue-100`
          : props.color === "green"
            ? `bg-green-100`
            : `bg-gray-100`
  );

  useEffect(() => {
    const newColor =
      props.color === "yellow"
        ? `bg-yellow-100`
        : props.color === "red"
          ? `bg-red-100`
          : props.color === "blue"
            ? `bg-blue-100`
            : props.color === "green"
              ? `bg-green-100`
              : `bg-gray-100`;
    if (newColor !== color) {
      setColor(newColor);
    }
  }, [props.color, color]);

  const handleDelete = async () => {
    try {
      await NotesAPI.delete(props.id);
      // Add any additional logic after successful deletion
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <>
      <input type="checkbox" id={`note-modal-${props.id}`} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className={`modal-box ${color} relative size-[800px] overflow-y-hidden hover:overflow-y-auto`}>
          <div className="text-gray-800">
            <h1 className="card-title text-2xl">{props.title}</h1>
            <p className="text-xs flex-grow-0">
              {new Intl.DateTimeFormat("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
              }).format(new Date(Date.parse(props.createdAt) - 3 * 60 * 60 * 1000))}
            </p>

            {/* Botão de editar */}
            <button className="btn btn-ghost btn-xs">
              <FaPencil className="text-xs" />
            </button>

            {/* Botão de excluir */}
            <button className="btn btn-ghost btn-xs" onClick={handleDelete}>
              <FaTrashCan className="text-xs text-error" />
            </button>

            <p className="py-4">{props.content.split('\n').map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}</p>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={`note-modal-${props.id}`} />
      </div>
    </>
  );
}