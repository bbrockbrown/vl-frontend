import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from '@/components/layout/Navbar';
import QuizNavbar from '@/components/layout/QuizNavbar';
import Home from '@/pages/Home';
import Quiz from '@/pages/Quiz';
import Results from '@/pages/Results';
import theme from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import LoadingResults from '@/pages/LoadingResults';

function AppContent() {
  const location = useLocation();
  const isQuizPage = location.pathname === '/quiz';
  const isResultsPage = location.pathname === '/results';

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/quiz' element={<QuizNavbar />}>
        <Route index element={<Quiz />} />
        <Route path='loading-results' element={<LoadingResults />} />
        <Route path='results' element={<Results />} />
      </Route>
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
