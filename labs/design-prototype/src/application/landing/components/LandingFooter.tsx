//* @type Component
//* @context Landing
//* @utility Footer editorial con logo, columnas de links y meta legal.

import BrandLogo from "@/components/core/BrandLogo";

const COLS = [
   {
      title: "Producto",
      links: ["Cómo funciona", "Catálogo", "Para empresas", "Para empleados", "Pricing"],
   },
   {
      title: "Empresa",
      links: ["Sobre nosotros", "Clientes", "Blog", "Trabajá con nosotros", "Prensa"],
   },
   {
      title: "Recursos",
      links: ["Centro de ayuda", "Documentación", "Status", "Seguridad", "Contacto"],
   },
];

export default function LandingFooter() {
   return (
      <footer className="border-t border-hairline">
         <div className="container-page py-16 sm:py-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
               <div className="flex flex-col gap-5 lg:col-span-4">
                  <BrandLogo variant="horizontal" size={28} />
                  <p className="max-w-[36ch] text-sm text-text-mid">
                     Webapp interna de beneficios laborales. Centralizá tu catálogo
                     y dejá que tu equipo elija el beneficio que de verdad necesita.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-3 lg:col-span-8">
                  {COLS.map((c) => (
                     <div key={c.title} className="flex flex-col gap-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-low">
                           {c.title}
                        </p>
                        <ul className="flex flex-col gap-2">
                           {c.links.map((l) => (
                              <li key={l}>
                                 <a
                                    href="#"
                                    className="text-sm text-text-mid transition-colors hover:text-text-hi"
                                 >
                                    {l}
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
            </div>

            <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-xs text-text-low sm:flex-row sm:items-center">
               <p>© {new Date().getFullYear()} SwitchPay. Todos los derechos reservados.</p>
               <ul className="flex flex-wrap gap-5">
                  <li><a href="#" className="hover:text-text-hi">Privacidad</a></li>
                  <li><a href="#" className="hover:text-text-hi">Términos</a></li>
                  <li><a href="#" className="hover:text-text-hi">Cookies</a></li>
               </ul>
            </div>
         </div>
      </footer>
   );
}
