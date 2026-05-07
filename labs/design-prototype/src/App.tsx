//* @type Shell
//* @context Global
//* @utility Providers globales y tabla de rutas. De momento solo monta la landing publica.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

import LandingPage from "@/pages/LandingPage";
import NotFoundPage from "@/pages/NotFoundPage";

import PagesExplorerIntegration from "@/devtools/pages-explorer/layouts/PagesExplorerIntegration";

const queryClient = new QueryClient();

const App = () => (
   <QueryClientProvider client={queryClient}>
      <TooltipProvider>
         <Sonner />
         <BrowserRouter>
            <PagesExplorerIntegration>
               <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="*" element={<NotFoundPage />} />
               </Routes>
            </PagesExplorerIntegration>
         </BrowserRouter>
      </TooltipProvider>
   </QueryClientProvider>
);

export default App;
