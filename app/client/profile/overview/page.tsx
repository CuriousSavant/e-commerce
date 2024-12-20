'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { MdPersonOutline } from 'react-icons/md';
import MobileLayout from '@/components/section/mobile-layout';

const UserProfile: React.FC = () => {
  const [users, setUsers] = useState<User>()
  const [loading, setLoading] = useState<boolean>(false)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/users?userId=${session.user.id}`);
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session?.user?.id]);

  return (
    <Box sx={{ flexGrow: 1, pl: 0, alignItems: "center", p: 1 }}>
      <Box sx={{ display: "flex", px: { xs: 1.5, md: 0 } }}>
        <MdPersonOutline fontWeight={700} fontSize={"30px"} />
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
          ข้อมูลส่วนตัว
        </Typography>
      </Box>

      {/* รายละเอืยดข้อมูล user */}
      {loading ? (
        <div className='flex justify-center items-center'>
          <CircularProgress className='my-3' />
        </div>
      ) : (
        <Paper variant='outlined' sx={{ padding: 2, marginBottom: 2 }}>
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>ชื่อ</Typography>
                <Typography>{users?.name}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>อีเมล</Typography>
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
                <Typography fontWeight={600}>เบอร์โทรศัพท์</Typography>
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
      )
      }

      {/* mobile content */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileLayout />
      </Box>
    </Box>
  );
};

export default UserProfile;