'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, IconButton } from '@mui/material';
import axios from 'axios';
import { User } from '@/types/user';
import { Alert } from '@mui/material';
import { useSession } from 'next-auth/react';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const AccountInformation = () => {
  const [users, setUsers] = useState<User | null>(null);

  const [newName, setNewName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDateOfBirth, setNewDateOfBirth] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [openDialog, setOpenDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [snackMessage, setSnackMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const { data: session } = useSession();

  const router = useRouter()

  useEffect(() => {
    if (session?.user.id) {
      axios.get(`/api/users?userId=${session?.user.id}`)
        .then((res) => {
          const user = res.data;
          setUsers(user);
          setNewName(user.name || '');
          setNewLastName(user.lastName || '');
          setNewEmail(user.email || '');
          setNewPhone(user.phone || '');
          setNewDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().slice(0, 10) : '');
        });
    }
  }, []);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleUpdateUser = async () => {
    const validationErrors: { [key: string]: string } = {};

    if (!currentPassword) validationErrors.currentPassword = 'กรุณากรอกรหัสผ่านปัจจุบัน';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('/api/verify-password', { password: currentPassword, userId: users?.id });

      if (res.data.valid) {
        const updatedData = {
          id: users?.id,
          name: newName,
          lastName: newLastName,
          email: newEmail,
          phone: newPhone,
          dateOfBirth: newDateOfBirth,
          currentPassword,
        };

        await axios.put(`/api/users/${session?.user.id}`, updatedData);
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
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </Grid>

            {/* นามสกุล */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="นามสกุล"
                variant="standard"
                value={newLastName}
                onChange={(e) => {
                  setNewLastName(e.target.value);
                }}
              />
            </Grid>

            {/* อีเมล */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="อีเมล"
                variant="standard"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
            </Grid>

            {/* เบอร์โทรศัพท์ */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="เบอร์โทรศัพท์"
                variant="standard"
                value={newPhone}
                onChange={(e) => {
                  setNewPhone(e.target.value);
                }}
              />
            </Grid>

            {/* วันเกิด */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="วันที่เกิด"
                variant="standard"
                type="date"
                value={newDateOfBirth}
                onChange={(e) => {
                  setNewDateOfBirth(e.target.value);
                }}
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
        <DialogTitle sx={{ width: "400px" }}>ยืนยันรหัสผ่าน</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="กรอกรหัสผ่านปัจจุบันของคุณ"
            type="password"
            value={currentPassword}
            variant="standard"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setErrors((prev) => ({ ...prev, currentPassword: '' }));
            }}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
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