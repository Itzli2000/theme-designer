import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Box, CircularProgress } from "@mui/material";

// Layouts
const AuthLayout = React.lazy(() => import("@app/layout/AuthLayout"));
const MainLayout = React.lazy(() => import("@app/layout/MainLayout"));

// Pages
const Dashboard = React.lazy(
  () => import("@domains/dashboard/pages/Dashboard")
);
const LoginProvider = React.lazy(() => import("@domains/auth/providers/LoginProvider"));
const RegisterProvider = React.lazy(() => import("@domains/auth/providers/RegisterProvider"));
const ThemesList = React.lazy(() => import("@domains/themes/pages/ThemesList"));
const ThemeCreate = React.lazy(
  () => import("@domains/themes/pages/ThemeCreate")
);
const ThemeDetail = React.lazy(
  () => import("@domains/themes/pages/ThemeDetail")
);
const ThemeEdit = React.lazy(() => import("@domains/themes/pages/ThemeEdit"));
const Profile = React.lazy(() => import("@domains/profile/pages/Profile"));
const NotFound = React.lazy(() => import("@shared/pages/NotFound"));

// Components
import { ProtectedRoute } from "./ProtectedRoute";

const LoadingFallback = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    minHeight="200px"
  >
    <CircularProgress />
  </Box>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Direct auth routes */}
          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<LoginProvider />} />
          </Route>
          <Route path="/register" element={<AuthLayout />}>
            <Route index element={<RegisterProvider />} />
          </Route>

          {/* Protected Routes - using MainLayout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Themes Routes */}
            <Route path="themes">
              <Route index element={<ThemesList />} />
              <Route path="create" element={<ThemeCreate />} />
              <Route path=":id" element={<ThemeDetail />} />
              <Route path=":id/edit" element={<ThemeEdit />} />
            </Route>

            {/* Profile Routes */}
            <Route path="profile" element={<Profile />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
