
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Posting from "./pages/Posting";
import Visualize from "./pages/Visualize";
import Seminars from "./pages/Seminars";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import About from "./pages/About";
import AIConsciousnessPost from "./pages/AIConsciousnessPost";
import NotFound from "./pages/NotFound";
import MaxTegmark from "./pages/MaxTegmark";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/seminars" element={<Seminars />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/max-tegmark" element={<MaxTegmark />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/ai-consciousness" element={<AIConsciousnessPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
