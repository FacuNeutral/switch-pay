//* @type Shell
//* @context Global
//* @utility Providers globales y tabla de rutas centralizada.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import WatchPage from "@/pages/WatchPage";
import ShortsPage from "@/pages/ShortsPage";
import SearchPage from "@/pages/SearchPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import PagesExplorerIntegration from "@/devtools/pages-explorer/layouts/PagesExplorerIntegration";

const queryClient = new QueryClient();

const App = () => (
  <div className="min-h-screen bg-neutral text-neutral-dark font-primary dark:bg-neutral-dark dark:text-neutral">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PagesExplorerIntegration>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shorts" element={<ShortsPage />} />
                <Route path="/watch/:id" element={<WatchPage />} />
                <Route path="/search" element={<SearchPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PagesExplorerIntegration>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;
