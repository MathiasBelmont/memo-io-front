interface NoteProps {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  color: string;
}

export default function NoteModal(props: NoteProps) {
  return (
    <>
      <input type="checkbox" id={`note-modal-${props.id}`} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-yellow-100 relative size-[800px] overflow-hidden">
          <div className="pt-36 text-gray-800">
            <h1 className="card-title text-xl">{props.title}</h1>
            <p className="py-4">{props.content}</p>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={`note-modal-${props.id}`}/>
      </div>
    </>
  );
}