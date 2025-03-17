import { Metadata } from 'next'
import SidebarMenu from '@/components/admin/sidebar';
import { Box } from '@mui/material';
import NavbarAdmin from '@/components/admin/navbar';

export const metadata: Metadata = {
  title: "Admin Page"
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <NavbarAdmin />
      </Box>

      <Box sx={{ backgroundColor: "#1E1E2F", minHeight: "100vh", display: "flex", color: "white" }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SidebarMenu />
        </Box>

        <Box sx={{ ml: { xs: 0, md: "260px", width: "100%" } }}>
          {children}
        </Box>
      </Box>
    </>
  );
}