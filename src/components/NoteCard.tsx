import NoteModal from "./NoteModal";

interface NoteProps {
  id: number;
  title: string;
  note: string;
  image?: string;
  alt: string;
  color: string;
}

export default function NoteCard({ id, title, note, image, alt, color}: NoteProps) {

  const modalId = `note-modal-${id}`;
  const modal = document.getElementById(modalId) as HTMLDialogElement;

  const handleCick = () => {
    console.log("Teste");
    (modal as HTMLDialogElement)?.showModal();
  }

  return (
    <>
      <div
        className={`card bg-base-100 size-80 border-4 border-${color}-500 shadow-lg cursor-pointer select-none overflow-hidden`}
        onClick={handleCick}
      >
        <div className="transition-opacity duration-300 hover:opacity-75 size-full">
          <div className="card-body select-none h-3/5">
            <h2 className="card-title text-md">{title}</h2>
            <p className="text-sm bg-gradient-to-b from-base-content to-transparent bg-clip-text text-transparent overflow-hidden">{note}</p>
          </div>
          {image &&
            <figure className="overflow-hidden h-2/5">
              <img
                src={image}
                alt={alt}
              />
            </figure>
          }
        </div>
      </div>
      <NoteModal
        id={id}
        title={title}
        note={note}
        image={image}
        alt={alt}
        color={color}
      />
    </>
  );
}

