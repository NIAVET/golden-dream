
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import EuroMillions from "./pages/EuroMillions";
import Loto from "./pages/Loto";
import Keno from "./pages/Keno";
import EuroDreams from "./pages/EuroDreams";
import SpecialDraws from "./pages/SpecialDraws";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Index />} />
            <Route path="/euromillions" element={<EuroMillions />} />
            <Route path="/loto" element={<Loto />} />
            <Route path="/keno" element={<Keno />} />
            <Route path="/eurodreams" element={<EuroDreams />} />
            <Route path="/special-draws" element={<SpecialDraws />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
