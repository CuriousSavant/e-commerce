'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import axios from 'axios';
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { MdPersonOutline } from 'react-icons/md';
import MobileLayout from '@/components/section/mobile-layout';

const UserProfile: React.FC = () => {
  const [users, setUsers] = useState<User>()
  const { data: session } = useSession()

  useEffect(() => {
    axios.get(`/api/users?userId=${session?.user.id}`).then((res) => setUsers(res.data))
  }, [])

  return (
    <Box sx={{ flexGrow: 1, pl: 0, alignItems: "center", p: 1 }}>
      <Box sx={{ display: "flex", px: { xs: 1.5, md: 0 } }}>
        <MdPersonOutline fontWeight={700} fontSize={"30px"} />
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
          ข้อมูลส่วนตัว
        </Typography>
      </Box>

      {/* รายละเอืยดข้อมูล user */}
      <Paper variant='outlined' sx={{ padding: 2, marginBottom: 2 }}>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>ชื่อ</Typography>
              <Typography>{users?.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>อีเมล</Typography>
              <Typography>
                {users?.email}{' '}
                {users?.emailVerified && (
                  <Button size="small" color="primary">
                    ยืนยันแล้ว
                  </Button>
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>เบอร์โทรศัพท์</Typography>
              <Typography>
                {users?.phone ? users.phone : "ไม่มีโทรศัพท์"}
              </Typography>
            </Grid>
          </Grid>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                mt: 2,
                px: { xs: 3, md: 5 },
              }}
              href='/client/profile/account-information'
            >
              แก้ไข
            </Button>
          </Box>
        </Box>
      </Paper>

      {/*  */}
      <Paper variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: 2 }}>
          จัดการที่อยู่จัดส่ง
        </Typography>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>ไม่มีที่อยู่จัดส่ง</Typography>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginTop: 2 }}
            href='/client/profile/shipping-address'
          >
            แก้ไข
          </Button>
        </Box>
      </Paper>

      {/* mobile content */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileLayout />
      </Box>
    </Box>
  );
};

export default UserProfile;