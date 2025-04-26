import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'
import Settings from './pages/Settings'
import Playground from './components/Playground';
import Home from './pages/Home';

function App() {
  const navLinks = [
    { label: 'Agents', href: '/dashboard/bots', isActive: true },
    { label: 'Usage', href: '/dashboard/usage' },
    { label: 'Settings', href: '/dashboard/settings' },
  ];
  const navItemss = [
    { label: 'Playground', href: '/playground' },
    { label: 'Activity', href: '/activity' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Sources', href: '/sources' },
    { label: 'Actions', href: '/actions' },
    { label: 'Contacts', href: '/contacts' },
    { label: 'Connect', href: '/connect' },
    { label: 'Settings', href: '/settings' },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/dashboard" element={<DashboardLayout navLinks={navLinks} />}>
          <Route path='bots' element={<Dashboard />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='/dashboard/bot' element={<DashboardLayout navLinks={navItemss}/>}>
          <Route path='a' element={<Playground/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
