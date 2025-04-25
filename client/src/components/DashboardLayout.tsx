import Navbar from './Navbar'
import MainNavbar from './MainNavbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = ({ navLinks }: { navLinks: { label: string; path: string }[] }) => {
    return (
        <>
            <Navbar />
            <MainNavbar items={navLinks} />
            <Outlet />
        </>
    )
}

export default DashboardLayout
