import { Metadata } from 'next'
import SidebarMenu from '@/components/admin/sidebar';
import { Box } from '@mui/material';
import NavbarAdmin from '@/components/admin/navbar';

export const metadata: Metadata = {
  title: "Admin Page"
}

// <Box className='min-h-screen text-black flex' bgcolor={"primary.dark"}>
//     <Box className='flex-grow rounded-md text-neutral-800 overflow-x-auto'>
//         {/* <SidebarMenu /> */}

//         <Box sx={{ ml: { xs: 0, md: "280px" } }}>
//             {children}
//         </Box>
//     </Box>
// </Box>

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarAdmin />
      <Box sx={{ backgroundColor: "#1E1E2F", minHeight: "100vh", display: "flex", color: "white" }}>
        {/* Sidebar */}
        <SidebarMenu />

        <Box sx={{ ml: { xs: 0, md: "260px" } }}>
          {children}
        </Box>
      </Box>
    </>
  );
}