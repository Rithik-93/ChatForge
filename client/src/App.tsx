import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout/>}>
        <Route path='bots' element={<Dashboard/>}/>
        <Route path='settings' element={<Settings/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
