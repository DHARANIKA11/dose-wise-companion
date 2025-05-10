
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { MedicationProvider } from "@/context/MedicationContext";

import Index from "./pages/Index";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Medications from "./pages/Medications";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import AddMedication from "./pages/AddMedication";
import EditMedication from "./pages/EditMedication";
import MedicationDetail from "./pages/MedicationDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <MedicationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }>
                <Route index element={<Dashboard />} />
              </Route>
              
              <Route path="/medications" element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }>
                <Route index element={<Medications />} />
              </Route>
              
              <Route path="/schedule" element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }>
                <Route index element={<Schedule />} />
              </Route>
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }>
                <Route index element={<Profile />} />
              </Route>
              
              <Route path="/add-medication" element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }>
                <Route index element={<AddMedication />} />
              </Route>
              
              <Route path="/medication/:id" element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }>
                <Route index element={<MedicationDetail />} />
              </Route>
              
              <Route path="/medication/:id/edit" element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }>
                <Route index element={<EditMedication />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MedicationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
