import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '@/components/layout/Navbar';
import Home from '@/pages/Home';

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
