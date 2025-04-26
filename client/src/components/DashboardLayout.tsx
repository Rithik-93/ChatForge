import Navbar from './Navbar'
import MainNavbar from './MainNavbar'
import { Outlet } from 'react-router-dom'

type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

const DashboardLayout = ({ navLinks }: { navLinks: NavItem[] }) => {
    return (
        <>
            <Navbar />
            <MainNavbar items={navLinks} />
            <Outlet />
        </>
    )
}

export default DashboardLayout