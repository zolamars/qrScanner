import React from 'react';
import { Slide } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignIn from './signIn';
import ProtectedRoute from './protectedRoute';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetch when window regains focus
      keepPreviousData: true,
      retry: false,
    },
  },
});
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        TransitionComponent={Slide}
      >
        <Router>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route
              path="/"
              element={
                <ProtectedRoute />
              }
            />
          </Routes>
        </Router>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;