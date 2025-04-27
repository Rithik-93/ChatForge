import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'
import Settings from './pages/DashboardSettings'
import Playground from './components/Playground/Playground';
import Home from './pages/Home';
import SettingsPage from './pages/Settings';
import Sources from './pages/Sources';
import CreateBot from './pages/CreateBot';
import { RequireAuth } from './components/Auth/Requred-Auth';
import Login from './pages/Login';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navLinks = [
    { label: 'Agents', href: '/dashboard/bots', isActive: currentPath === '/dashboard/bots' },
    { label: 'Usage', href: '/dashboard/usage', isActive: currentPath === '/dashboard/usage' },
    { label: 'Settings', href: '/dashboard/settings', isActive: currentPath === '/dashboard/settings' },
  ];

  const navItemss = [
    { label: 'Playground', href: '/dashboard/bot/a', isActive: currentPath === '/dashboard/bot/a' },
    { label: 'Activity', href: '/activity', isActive: currentPath === '/activity' },
    { label: 'Analytics', href: '/analytics', isActive: currentPath === '/analytics' },
    { label: 'Sources', href: '/dashboard/bot/a/sources', isActive: currentPath === '/dashboard/bot/a/sources' },
    { label: 'Actions', href: '/actions', isActive: currentPath === '/actions' },
    { label: 'Contacts', href: '/contacts', isActive: currentPath === '/contacts' },
    { label: 'Connect', href: '/dashboard/bot/a/connect', isActive: currentPath === '/dashboard/bot/a/connect' },
    { label: 'Settings', href: '/dashboard/bot/a/settings', isActive: currentPath === '/dashboard/bot/a/settings' },
  ];

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Navigate to="/dashboard/bots" replace />} />
        
        <Route path="/dashboard" element={<DashboardLayout navLinks={navLinks} />}>
          <Route path='bots' element={<Dashboard />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        
        <Route path='/dashboard/bot' element={<DashboardLayout navLinks={navItemss} />}>
          <Route path='/:id' element={<Playground />} />
          <Route path='a/settings' element={<SettingsPage />} />
          <Route path='a/sources' element={<Sources />} />
          <Route path='a/connect' element={<SettingsPage />} />
        </Route>
        
        <Route path='/dashboard/create' element={<CreateBot />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App