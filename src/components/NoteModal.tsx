import { useState, useEffect, Fragment } from "react";
import { FaFloppyDisk, FaPencil, FaTrashCan, FaX, FaXmark } from "react-icons/fa6";
import NotesAPI from "../utils/NotesAPI";

interface NoteProps {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  color: string;
}

export default function NoteModal(props: NoteProps & { onUpdate: (shouldFetch: boolean) => void }) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [color, setColor] = useState(props.color);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async () => {
    try {
      await NotesAPI.update(props.id, { title, content, color });
      props.onUpdate(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao editar a nota:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await NotesAPI.delete(props.id);
      props.onUpdate(true);
      document.getElementById(`note-modal-${props.id}`)?.click();
    } catch (error) {
      console.error('Erro ao deletar a nota:', error);
    }
  };

  const handleDiscard = () => {
    setTitle(props.title);
    setContent(props.content);
    setColor(props.color);
    setIsEditing(false);
  };

  return (
    <>
      <input type="checkbox" id={`note-modal-${props.id}`} onClick={handleDiscard} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className={`modal-box ${color} relative size-[600px]`}>
          <div className="text-gray-800">

            <div className="flex pb-2">

              <div className="flex-grow">

                {isEditing ? (
                  <>
                    {/* Botão de salvar */}
                    <button className="btn btn-ghost btn-xs text-xs text-success" onClick={handleEdit}>
                      <FaFloppyDisk />
                      Salvar
                    </button>

                    {/* Botão de descartar */}
                    <button className="btn btn-ghost btn-xs text-xs text-error" onClick={handleDiscard}>
                      <FaXmark />
                      Descartar
                    </button>
                  </>
                ) : (
                  <>
                    {/* Botão de editar */}
                    <button className="btn btn-ghost btn-xs text-xs" onClick={() => setIsEditing(true)}>
                      <FaPencil />
                      Editar
                    </button>

                    {/* Botão de excluir */}
                    <button className="btn btn-ghost btn-xs text-xs text-error" onClick={handleDelete}>
                      <FaTrashCan />
                      Excluir
                    </button>
                  </>
                )}

              </div>

              {/* Opções de cores */}
              {isEditing && (
                <div className="flex gap-1">
                  {["bg-yellow-100", "bg-red-100", "bg-blue-100", "bg-green-100"].map((colorButton) => (
                    <div
                      key={colorButton}
                      className={`size-6 rounded-full ${colorButton} border ${colorButton === color ? "border-accent" : "border-grey"} ${colorButton === color ? "" : "opacity-75 hover:opacity-100"}`}
                      onClick={() => setColor(colorButton)}
                    />
                  ))}
                </div>
              )}

            </div>

            {/* Título da nota */}
            {isEditing ? (
              <input
                type="text"
                className={`card-title p-0 text-2xl input input-sm h-[35px] w-full bg-white bg-opacity-50`}
                value={title}
                maxLength={35}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1 className="card-title text-2xl break-all whitespace-pre-wrap">{props.title}</h1>
            )}

            {/* Data da nota */}
            <p className="text-xs flex-grow-0 py-2">
              {new Intl.DateTimeFormat("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
              }).format(new Date(Date.parse(props.createdAt) - 3 * 60 * 60 * 1000))}
            </p>

            {/* Conteúdo da nota */}
            {isEditing ? (
              <textarea
                className={`textarea p-0 text-[16px] leading-6 w-full h-[425px] resize-none bg-white bg-opacity-50`}
                maxLength={5000}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <div className="overflow-y-auto break-all h-[425px]">{props.content.split('\n').map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ))}</div>
            )}

            {/* Quantidade de caracteres */}
            {isEditing && (
              <p className={`text-xs flex-grow-0 pt-2 text-right ${content.length === 5000 ? "text-error" : ""}`}>
                {content.length} / 5000
              </p>
            )}

          </div>
        </div>
        <label className="modal-backdrop" htmlFor={`note-modal-${props.id}`} />
      </div>
    </>
  );
}