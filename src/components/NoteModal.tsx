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
    <dialog id={`note-modal-${id}`} className="modal">
      <div className={`modal-box relative size-[800px] overflow-hidden border-4 border-${color}-500`}>
        <img src={image} alt={alt} className="absolute inset-0 w-full h-40 object-cover opacity-100" />
        <div className="pt-36">
          <h1 className="card-title text-xl">{title}</h1>
          <p className="py-4">{note}</p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>
          Fechar
        </button>
      </form>
    </dialog>
  );
}

