//<ORGANISM>
export default function WelcomeCard() {
  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl shadow-black/40">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-violet-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 15"
          />
        </svg>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-zinc-100 text-2xl font-semibold tracking-tight leading-tight">
          Bienvenido a react-ast
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Una herramienta para generar y manipular componentes React a través de
          su árbol sintáctico abstracto (AST).
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800" />

      {/* Feature list */}
      <ul className="flex flex-col gap-3">
        {[
          { label: 'Parseo de componentes', desc: 'Analiza la estructura de tus componentes React.' },
          { label: 'Generación de código', desc: 'Genera código a partir de nodos AST.' },
          { label: 'Edición de nodos', desc: 'Modifica imports, clases y props en tiempo real.' },
        ].map(({ label, desc }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
            <span className="text-sm text-zinc-300">
              <span className="font-medium text-zinc-100">{label}</span>
              {' — '}
              <span className="text-zinc-500">{desc}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className="mt-2 w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors cursor-pointer">
        Empezar
      </button>
    </div>
  )
}
