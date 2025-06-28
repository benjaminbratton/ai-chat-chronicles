
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Posting from "./pages/Posting";
import Visualize from "./pages/Visualize";
import Seminars from "./pages/Seminars";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AIConsciousnessPost from "./pages/AIConsciousnessPost";
import NotFound from "./pages/NotFound";
import MaxTegmark from "./pages/MaxTegmark";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/visualize" element={<Visualize />} />
            <Route path="/seminars" element={<Seminars />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/max-tegmark" element={<MaxTegmark />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/ai-consciousness" element={<AIConsciousnessPost />} />
            
            {/* Protected Routes */}
            <Route path="/posting" element={
              <ProtectedRoute>
                <Posting />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
