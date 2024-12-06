/**
 * Note for Developers:
 *
 * This project is a small example of an E-commerce website created by a beginner 
 * for learning and practice purposes only. 
 * **It is not functional for real-world use** and does not include full E-commerce features.
 *
 * - The forms in this project are not connected to a real backend.
 * - Please build your own forms and backend systems for actual use cases.
 *
 * The goal of this project is to showcase a basic design example 
 * that you can customize and expand according to your needs.
 *
 * Thank you for your interest and feel free to continue developing it further!
 */

'use client'
import React, { useState } from 'react';
import { Box, Button, Snackbar, Alert, IconButton } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const ShippingAddress = () => {
  const [snackOpen, setSnackOpen] = useState(false);

  const handleButtonClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const router = useRouter();

  return (
    <Box sx={{ px: 3 }}>
      <IconButton sx={{ mb: 4 }} onClick={() => router.push('/client/profile/overview')}>
        <BiArrowBack />
      </IconButton>
      <Box
        sx={{
          borderWidth: 3,
          height: "20rem",
          borderStyle: "dashed",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Button
          sx={{
            px: 5,
            py: 1.5,
            color: "black",
            fontSize: "18px",
            border: "1px solid black",
          }}
          variant="outlined"
          startIcon={<MdAdd />}
          onClick={handleButtonClick}
        >
          เพิ่มที่อยู่ใหม่
        </Button>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackClose} severity="warning" variant="filled">
          ยังไม่สามารถเพิ่มที่อยู่ได้
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShippingAddress;
