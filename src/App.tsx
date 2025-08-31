import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '@/components/layout/Navbar';
import QuizNavbar from '@/components/layout/QuizNavbar';
import Home from '@/pages/Home';
import Quiz from '@/pages/Quiz';
import Results from '@/pages/Results';
import Profile from '@/pages/Profile';
import theme from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import LoadingResults from '@/pages/LoadingResults';
import Credits from '@/pages/Credits';

function AppContent() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='credits' element={<Credits />} />
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
