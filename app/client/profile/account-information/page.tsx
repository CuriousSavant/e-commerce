'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useSession } from 'next-auth/react';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { LuEyeClosed } from 'react-icons/lu'

const AccountInformation = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [openDialog, setOpenDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [snackMessage, setSnackMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [visibilityOpen, setVisibilityOpen] = useState(false);

  const { data: session } = useSession();

  const router = useRouter()

  useEffect(() => {
    if (session?.user.id) {
      axios.get(`/api/user?userId=${session?.user.id}`)
        .then((res) => {
          const user = res.data;
          setUserDetails({
            name: user.firstname || '',
            lastName: user.lastname || '',
            email: user.email || '',
            phone: user.phone || '',
            dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().slice(0, 10) : ''
          });
        });
    }
  }, [session?.user.id]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === 'phone') {
      value = value.replace(/\D/g, "");
      if (value.length <= 3) value = value;
      else if (value.length <= 6)
        value = `${value.slice(0, 3)} ${value.slice(3)}`;
      else
        value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(
          6,
          10
        )}`;
    }

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleUpdateUser = async () => {
    const validationErrors: { [key: string]: string } = {};

    if (!currentPassword) validationErrors.currentPassword = 'กรุณากรอกรหัสผ่านปัจจุบัน';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('/api/verify-password', { password: currentPassword, userId: session?.user.id });

      if (res.data.valid) {
        const updatedData = {
          ...userDetails,
          id: session?.user.id,
          currentPassword,
        };

        await axios.put(`/api/user/${session?.user.id}`, updatedData);
        setErrors({});
        setSnackMessage('ข้อมูลอัปเดตเรียบร้อย');
        setSnackOpen(true);
        setOpenDialog(false);
        setCurrentPassword('')
      } else {
        setErrors({ currentPassword: 'รหัสผ่านไม่ถูกต้อง' });
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setErrors({ currentPassword: err.response.data.msg });
      } else {
        setSnackMessage('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        setSnackOpen(true);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, px: 3 }}>
      <IconButton sx={{ mb: 4 }} onClick={() => router.push('/client/profile/overview')}>
        <BiArrowBack />
      </IconButton>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
        จัดการข้อมูลส่วนตัว
      </Typography>
      <Paper elevation={0} variant="outlined" sx={{ py: 4, px: 3, marginBottom: 2 }}>
        <Box component="form">
          <Grid container spacing={2}>
            {/* ชื่อ */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ชื่อ"
                variant="standard"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
              />
            </Grid>

            {/* นามสกุล */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="นามสกุล"
                variant="standard"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleInputChange}
              />
            </Grid>

            {/* อีเมล */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="อีเมล"
                variant="standard"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
              />
            </Grid>

            {/* เบอร์โทรศัพท์ */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="เบอร์โทรศัพท์"
                variant="standard"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
              />
            </Grid>

            {/* วันเกิด */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="วันที่เกิด"
                variant="standard"
                type="date"
                name="dateOfBirth"
                value={userDetails.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", mt: 6 }}>
          <Button sx={{ color: "white", px: 6 }} variant="contained" onClick={handleDialogOpen}>บันทึก</Button>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>ยืนยันรหัสผ่าน</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="รหัสผ่านปัจจุบันของคุณ"
            type={visibilityOpen ? 'text' : 'password'}
            value={currentPassword}
            variant="standard"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setErrors((prev) => ({ ...prev, currentPassword: '' }));
            }}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton size='small' onClick={() => setVisibilityOpen(!visibilityOpen)} sx={{ color: "gray" }}>
                    {visibilityOpen ? <MdOutlineRemoveRedEye /> : <LuEyeClosed />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackMessage === 'ข้อมูลอัปเดตเรียบร้อย' ? 'success' : 'error'}>{snackMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountInformation;