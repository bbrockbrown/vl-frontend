import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '@/components/layout/Navbar';
import Home from '@/pages/Home';
import theme from './theme/theme';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<Navbar />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
