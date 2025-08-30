import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { IssueProvider } from "@/contexts/IssueContext";
import { Navbar } from "@/components/Navbar";
import Home from "./pages/Home";
import Heatmaps from "./pages/Heatmaps";
import ReportIssue from "./pages/ReportIssue";
import CheckStatus from "./pages/CheckStatus";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminIssueManagement from "./pages/admin/AdminIssueManagement";
import AdminMyProblems from "./pages/admin/AdminMyProblems";
import AdminCompleted from "./pages/admin/AdminCompleted";
import AdminProfile from "./pages/admin/AdminProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <IssueProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/heatmaps" element={<Heatmaps />} />
              <Route path="/report" element={<ReportIssue />} />
              <Route path="/status" element={<CheckStatus />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/issues" element={<AdminIssueManagement />} />
              <Route path="/admin/my-problems" element={<AdminMyProblems />} />
              <Route path="/admin/completed" element={<AdminCompleted />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              
              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </IssueProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
