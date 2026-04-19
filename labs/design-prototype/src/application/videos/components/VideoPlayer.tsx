//* @type Molecule
//* @context Videos
//* @utility Reproductor de video con thumbnail, botón de play y barra de progreso.

interface VideoPlayerProps {
  thumbnail: string;
  title: string;
}

export default function VideoPlayer({ thumbnail, title }: VideoPlayerProps) {
  return (
    <div className="aspect-video bg-neutral dark:bg-neutral-surface-dark rounded-xl overflow-hidden relative">
      {/* <Tag> Media — thumbnail */}
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      {/* <Tag> Actions — botón de play */}
      <div className="absolute inset-0 flex items-center justify-center bg-neutral/30 dark:bg-neutral-dark/30">
        <button className="w-16 h-16 bg-neutral/70 dark:bg-neutral-dark/70 rounded-full flex items-center justify-center hover:bg-neutral/90 dark:hover:bg-neutral-dark/90 transition-colors">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-neutral-dark dark:text-neutral fill-current ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      {/* <Tag> Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral dark:bg-neutral-surface-dark">
        <div className="h-full bg-primary w-1/3" />
      </div>
    </div>
  );
}
