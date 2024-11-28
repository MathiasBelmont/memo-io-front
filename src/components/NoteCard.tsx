import NoteModal from "./NoteModal";

interface NoteProps {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  color: string;
}

export default function NoteCard(props: NoteProps) {

  return (
    <>
      <label htmlFor={`note-modal-${props.id}`} className="size-min">
        <div className="card size-80 drop-shadow-lg cursor-pointer select-none overflow-hidden">
          <div className="transition-opacity duration-300 hover:opacity-75 size-full">
            <div className="card-body select-none h-3/5 bg-yellow-100 text-gray-800">
              <h2 className="card-title text-md">{props.title}</h2>
              <p className="text-sm bg-gradient-to-b from-black to-transparent bg-clip-text text-transparent overflow-hidden">
                {props.content}
              </p>
            </div>
          </div>
        </div>
      </label>
      <NoteModal id={props.id} createdAt={props.createdAt} title={props.title} content={props.content} color={props.color} />
    </>
  );
}
