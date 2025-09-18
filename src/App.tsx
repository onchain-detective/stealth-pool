import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./providers/WalletProvider";
import Index from "./pages/Index";
import Pools from "./pages/Pools";
import Analytics from "./pages/Analytics";
import Docs from "./pages/Docs";
import LaunchApp from "./pages/LaunchApp";
import NotFound from "./pages/NotFound";

const App = () => (
  <WalletProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/launch" element={<LaunchApp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </WalletProvider>
);

export default App;
