import { useEffect, useState } from "react";
import NoteModal from "./NoteModal";

interface NoteProps {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  color: string;
}

export default function NoteCard(props: NoteProps) {
  const [color, setColor] = useState(props.color);

  useEffect(() => {
    setColor(props.color)
  }, [props.color]);

  return (
    <>
      <label htmlFor={`note-modal-${props.id}`} className="">
        <div className={`card drop-shadow-lg cursor-pointer select-none`}>
          <div className="transition-opacity duration-300 hover:opacity-50">
            <div className={`card-body size-[280px] ${color} select-none text-gray-800`}>
              <div className="flex flex-col h-[220px] gap-2 overflow-hidden overflow-wrap">
                <h2 className="card-title text-md">{props.title}</h2>
                <p className="text-xs flex-grow-0">
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  }).format(new Date(Date.parse(props.createdAt) - 3 * 60 * 60 * 1000))}
                </p>
                <p className="text-sm h-0 bg-gradient-to-b from-black to-transparent bg-clip-text text-transparent">
                  {props.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </label>
    </>
  );
}
