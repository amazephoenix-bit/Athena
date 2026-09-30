import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { OnboardingProvider } from './contexts/OnboardingContext';

// Layout
import AppLayout from './components/layout/AppLayout';
import OnboardingLayout from './components/onboarding/OnboardingLayout';

// Auth pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Onboarding pages
import OnboardingPersonal from './pages/onboarding/OnboardingPersonal';
import OnboardingLifestyle from './pages/onboarding/OnboardingLifestyle';
import OnboardingWellness from './pages/onboarding/OnboardingWellness';
import OnboardingProductivity from './pages/onboarding/OnboardingProductivity';
import OnboardingPets from './pages/onboarding/OnboardingPets';
import OnboardingIntegrations from './pages/onboarding/OnboardingIntegrations';
import OnboardingSafety from './pages/onboarding/OnboardingSafety';
import OnboardingPermissions from './pages/onboarding/OnboardingPermissions';

// App pages
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import TasksPage from './pages/TasksPage';
import RemindersPage from './pages/RemindersPage';
import MemoryPage from './pages/MemoryPage';
import BehaviorPage from './pages/BehaviorPage';
import WellnessPage from './pages/WellnessPage';
import LifestylePage from './pages/LifestylePage';
import PetsPage from './pages/PetsPage';
import SafetyPage from './pages/SafetyPage';
import RewardsPage from './pages/RewardsPage';
import FeedbackPage from './pages/FeedbackPage';
import SettingsPage from './pages/SettingsPage';

import LandingPage from './pages/LandingPage';
import LoadingSpinner from './components/ui/LoadingSpinner';

/** Route guard: authenticated users only */
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner fullPage />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

/** Route guard: unauthenticated users only */
function PublicRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <LoadingSpinner fullPage />;
  if (isAuthenticated) {
    return <Navigate to={user?.onboardingComplete ? '/dashboard' : '/onboarding/personal'} replace />;
  }
  return children;
}

/** Public Landing / Hero entry: displays the hero section */
function RootRoute() {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <LoadingSpinner fullPage />;
  if (isAuthenticated) {
    return <Navigate to={user?.onboardingComplete ? '/dashboard' : '/onboarding/personal'} replace />;
  }
  return <LandingPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <OnboardingProvider>
            <Routes>
              {/* Root Landing / Hero Page */}
              <Route path="/" element={<RootRoute />} />
              <Route path="/landing" element={<LandingPage />} />

              {/* Auth */}
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

              {/* Onboarding (needs auth, before onboarding complete) */}
              <Route path="/onboarding" element={<PrivateRoute><OnboardingLayout /></PrivateRoute>}>
                <Route index element={<Navigate to="/onboarding/personal" replace />} />
                <Route path="personal" element={<OnboardingPersonal />} />
                <Route path="lifestyle" element={<OnboardingLifestyle />} />
                <Route path="wellness" element={<OnboardingWellness />} />
                <Route path="productivity" element={<OnboardingProductivity />} />
                <Route path="pets" element={<OnboardingPets />} />
                <Route path="integrations" element={<OnboardingIntegrations />} />
                <Route path="safety" element={<OnboardingSafety />} />
                <Route path="permissions" element={<OnboardingPermissions />} />
              </Route>

              {/* Main app */}
              <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="reminders" element={<RemindersPage />} />
                <Route path="memory" element={<MemoryPage />} />
                <Route path="behavior" element={<BehaviorPage />} />
                <Route path="wellness" element={<WellnessPage />} />
                <Route path="lifestyle" element={<LifestylePage />} />
                <Route path="pets" element={<PetsPage />} />
                <Route path="safety" element={<SafetyPage />} />
                <Route path="rewards" element={<RewardsPage />} />
                <Route path="feedback" element={<FeedbackPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OnboardingProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
