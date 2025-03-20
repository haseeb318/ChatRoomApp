import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import Room from './pages/Room';
import PrivateRouter from './components/PrivateRouter';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <BrowserRouter> 
      <AuthProvider> 
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRouter />}>
            <Route index element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
