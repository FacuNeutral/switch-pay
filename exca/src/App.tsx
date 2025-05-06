import { Excalidraw } from "@excalidraw/excalidraw";
import bankJson from "../public/bank.excalidraw.json";

function App() {
  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Excalidraw
          initialData={{
            ...bankJson,
            appState: {
              theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
              gridSize: 20,
              gridStep: 5,     
              gridModeEnabled: false,
        viewBackgroundColor: "#ffffff",
        zoom: {value: 0.2 as never }, // Ignoring the typing of value
        scrollX: -2005.42, // Set initial X position
        scrollY: 6912.25, // Set initial Y position,
        viewModeEnabled: true, // Activa el modo de solo lectura
        zenModeEnabled: true,  // Opcional: oculta la interfaz para una vista más limpia
        gridSize: null         // Opcional: desactiva la cuadrícula
            },
            // scrollToContent: true,
          }}
        />
      </div>
    </>
  );   
} 
  
export default App;
