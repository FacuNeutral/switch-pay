//* @type Page
//* @context Global
//* @utility Página 404 standalone para rutas inexistentes.

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral dark:bg-neutral-dark">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-neutral-off-dark dark:text-neutral-off">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
}
