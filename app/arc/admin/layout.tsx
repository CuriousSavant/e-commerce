import { Metadata } from 'next'
import SidebarMenu from '@/components/admin-page/sidebar-menu';
import SidebarMobileMenu from '@/components/admin-page/product/sidebar-mobile-menu';
import { Box } from '@mui/material';

export const metadata: Metadata = {
    title: "Admin Page"
}


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen text-black flex'>
            <div className='flex-grow rounded-md text-neutral-800 overflow-x-auto'>
                <SidebarMenu />
                <Box sx={{ ml: { xs: 0, md: "280px" } }}>
                    {children}
                </Box>
            </div>
        </div>
    )
}

export default AdminLayout;