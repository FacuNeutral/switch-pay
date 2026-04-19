//* @type Molecule
//* @context Videos
//* @utility Bloque de metadata y descripción del video (vistas, fecha, texto).

interface VideoDescriptionProps {
  views: string;
  timestamp: string;
  description: string;
}

export default function VideoDescription({ views, timestamp, description }: VideoDescriptionProps) {
  return (
    <div className="mt-4 p-3 bg-neutral dark:bg-neutral-surface-dark rounded-xl">
      {/* <Tag> Metadata — vistas y fecha */}
      <p className="text-sm text-neutral-dark dark:text-neutral font-medium">
        {views} · {timestamp}
      </p>
      {/* <Tag> Content — descripción */}
      <p className="text-sm text-neutral-dark dark:text-neutral mt-1">{description}</p>
    </div>
  );
}
