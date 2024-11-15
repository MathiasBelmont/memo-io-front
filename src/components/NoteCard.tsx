import NoteModal from "./NoteModal";

interface NoteProps {
  id: number;
  title: string;
  note: string;
  image?: string;
  alt: string;
  color: string;
}

export default function NoteCard({ id, title, note, image, alt, color }: NoteProps) {

  return (
    <>
      <label htmlFor={`note-modal-${id}`} className="size-min">
        <div className="card size-80 drop-shadow-lg cursor-pointer select-none overflow-hidden">
          <div className="transition-opacity duration-300 hover:opacity-75 size-full">
            <div className="card-body select-none h-3/5 bg-yellow-100 text-gray-800">
              <h2 className="card-title text-md">{title}</h2>
              <p className="text-sm bg-gradient-to-b from-black to-transparent bg-clip-text text-transparent overflow-hidden">
                {note}
              </p>
            </div>
            {image && (
              <figure className="overflow-hidden h-2/5">
                <img src={image} alt={alt} />
              </figure>
            )}
          </div>
        </div>
      </label>
      <NoteModal id={id} title={title} note={note} image={image} alt={alt} color={color} />
    </>
  );
}
