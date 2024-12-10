import LoginPage from './pages/LoginPage';
import './App.css';
import Room from './pages/Room';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './utils/AuthContext';

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/',
      element: <PrivateRouter />, 
      children: [
        {
          path: '',
          element: <Room />, 
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
