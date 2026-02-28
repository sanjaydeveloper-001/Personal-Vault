import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedLayout from "./components/Layout/ProtectedLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ItemsPage from "./pages/ItemsPage";
import BinPage from "./pages/BinPage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import PublicFilesPage from "./pages/PublicFilesPage";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ForgotPassword from "./pages/ForgotPassword";
import SecurityQuestions from "./pages/SecurityQuestions";
import LoadingPage from "./pages/LoadingPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          containerStyle={{ zIndex: 99999 }}
        />
        <Routes>
          {/* Root — checks auth then redirects to /dashboard or /home */}
          <Route path="/" element={<LoadingPage />} />

          {/* Public routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/security-questions" element={<SecurityQuestions />} />

          {/* Protected routes with sidebar layout */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/bin" element={<BinPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/public" element={<PublicFilesPage />} />
            <Route path="/help" element={<HelpCenter />} />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;