import Navbar from './Navbar'
import MainNavbar from './MainNavbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <>
            <Navbar />
            <MainNavbar />
            <Outlet />
        </>
    )
}

export default DashboardLayout
