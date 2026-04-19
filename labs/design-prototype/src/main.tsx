//* @type Entrypoint
//* @context Global
//* @utility Punto de montaje de React. Solo renderiza <App /> e importa estilos globales.

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
