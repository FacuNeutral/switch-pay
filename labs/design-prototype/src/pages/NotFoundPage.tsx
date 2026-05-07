//* @type Page
//* @context Global
//* @utility Catch-all 404 minimal editorial.

import { Link } from "react-router-dom";

export default function NotFoundPage() {
   return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-6">
         <div className="flex max-w-md flex-col items-center gap-6 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-low">
               — Error 404
            </p>
            <h1 className="text-display text-[clamp(56px,9vw,128px)] text-text-hi">
               Sin <span className="text-shimmer">ruta</span>.
            </h1>
            <p className="text-text-mid">
               La página que buscás no existe o fue movida.
            </p>
            <Link
               to="/"
               className="inline-flex items-center gap-2 rounded-pill bg-text-hi px-5 py-2.5 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
            >
               Volver al inicio
            </Link>
         </div>
      </main>
   );
}
