import { useState, useEffect, Fragment } from "react";

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

  return (
    <>
      <input type="checkbox" id={`note-modal-${props.id}`} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className={`modal-box ${color} relative size-[800px] scrollbar overflow-y-auto`}>
          <div className="text-gray-800">
            <h1 className="card-title text-2xl">{props.title}</h1>
            <p className="text-xs flex-grow-0">
              {new Intl.DateTimeFormat("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
              }).format(new Date(props.createdAt))}
            </p>
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