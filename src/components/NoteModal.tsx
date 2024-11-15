interface NoteProps {
  id: number;
  title: string;
  note: string;
  image?: string;
  alt: string;
  color: string;
}

export default function NoteModal({ id, title, note, image, alt, color }: NoteProps) {
  return (
    <>
      <input type="checkbox" id={`note-modal-${id}`} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-yellow-100 relative size-[800px] overflow-hidden">
          <img src={image} alt={alt} className="absolute inset-0 w-full h-40 object-cover opacity-100" />
          <div className="pt-36 text-gray-800">
            <h1 className="card-title text-xl">{title}</h1>
            <p className="py-4">{note}</p>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={`note-modal-${id}`}/>
      </div>
    </>
  );
}