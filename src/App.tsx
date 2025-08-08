import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuthSimple";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Posting from "./pages/Posting";
import SimplePosting from "./pages/SimplePosting";
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
import Model from "./pages/Model";
import TestAuth from "./pages/TestAuth";
import SimpleTest from "./pages/SimpleTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/visualize" element={<Visualize />} />
                <Route path="/seminars" element={<Seminars />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/max-tegmark" element={<MaxTegmark />} />
                <Route path="/model" element={<Model />} />
                <Route path="/test-auth" element={<TestAuth />} />
                <Route path="/simple-test" element={<SimpleTest />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/ai-consciousness" element={<AIConsciousnessPost />} />
                
                {/* Protected Routes */}
                <Route path="/posting" element={<Posting />} />
                <Route path="/simple-posting" element={<SimplePosting />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
