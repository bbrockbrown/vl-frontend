import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from '@/components/layout/Navbar';
import QuizNavbar from '@/components/layout/QuizNavbar';
import Home from '@/pages/Home';
import Quiz from '@/pages/Quiz';
import Results from '@/pages/Results';
import theme from './theme/theme';
import { ThemeProvider } from '@emotion/react';

function AppContent() {
  const location = useLocation();
  const isQuizPage = location.pathname === '/quiz';
  const isResultsPage = location.pathname === '/results';

  return (
    <Routes>
      {isQuizPage ? (
        // Quiz route with QuizNavbar
        <Route path='/quiz' element={
          <>
            <QuizNavbar />
            <Quiz />
          </>
        } />
      ) : isResultsPage ? (
        // Results route without navbar for full-screen experience
        <Route path='/results' element={<Results />} />
      ) : (
        // All other routes with regular navbar
        <Route element={<Navbar />}>
          <Route path='/' element={<Home />} />
        </Route>
      )}
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
