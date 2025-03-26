"use client"
import { Box, IconButton, Typography } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';

type HeaderProps = {
  activeTab: 'login' | 'signup';
  handleDialogToggle: () => void;
};

function Header({ activeTab, handleDialogToggle }: HeaderProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      <IconButton size="small" onClick={handleDialogToggle}>
        <BiArrowBack />
      </IconButton>
      <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'center' }}>
        {activeTab === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
      </Typography>
      <Box sx={{ width: 24 }} />
    </Box>
  );
}

export default Header;
