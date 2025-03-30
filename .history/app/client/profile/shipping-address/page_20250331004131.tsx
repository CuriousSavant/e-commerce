'use client';
import React from 'react';
import { Box, Button, IconButton, Typography, ListItem, ListItemText, Chip } from '@mui/material';
import { MdAdd, MdDelete } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { BsHeart } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import useAddress
import FormAddress from '@/components/client/checkout/form-address';

const ShippingAddress = () => {
  const router = useRouter();
  const {
    allAddress,
    isFormOpen,
    formData,
    formErrors,
    handleChange,
    handleSubmit,
    handleEdit,
    handleClose,
    setIsFormOpen,
    handleDelete,
    handleSetDefaultAddress,
  } = useAddress();

  const handleSetDefault = (addressId: number) => {
    handleSetDefaultAddress(addressId);
  };

  return (
    <Box sx={{ px: 3 }}>
      <IconButton sx={{ mb: 4 }} onClick={() => router.back()}>
        <BiArrowBack />
      </IconButton>

      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', fontWeight: 'bold' }} component={'div'}>
          <BsHeart size={24} style={{ marginRight: '8px' }} />
          จัดการที่อยู่จัดส่ง
        </Typography>
        {allAddress.length > 0 && <Button size='small' onClick={() => setIsFormOpen(true)}>+ เพิ่มที่อยู่</Button>}
      </Box>

      {allAddress.length > 0 ? (
        <Box>
          {allAddress.map((address, index) => (
            <ListItem
              key={index}
              divider
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                }
              }}
              onClick={() => handleSetDefault(address.id as number)}
            >
              <ListItemText
                primary={
                  <Box display={'flex'} gap={1}>
                    <Typography component="span">{address.fullName}</Typography>
                    {address.type && <Chip label={address.type} size="small" />}
                    {address.isDefault && <Chip label="ค่าเริ่มต้น" color='primary' size='small' />}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" component="span">
                      เบอร์โทร: {address.phone}
                    </Typography>
                    <Typography variant="body2" component="span">
                      รายละเอียดที่อยู่: {`${address.address}, ${address.subDistrict}, ${address.district}, ${address.province} ${address.postalCode}`}
                    </Typography>
                  </Box>
                }
                primaryTypographyProps={{ component: 'div' }}
                secondaryTypographyProps={{ component: 'div' }}
              />
              <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                <Button
                  color="primary"
                  size="small"
                  onClick={(e) => { e.stopPropagation(); handleEdit(address); }}
                >
                  แก้ไข
                </Button>
                <IconButton
                  color="error"
                  size='small'
                  sx={{ p: '6px' }}
                  onClick={(e) => { e.stopPropagation(); handleDelete(address.id as number); }}
                >
                  <MdDelete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </Box>
      ) : (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          height={'40vh'}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "#666", fontSize: "16px" }}>
            คุณยังไม่มีที่อยู่จัดส่ง
          </Typography>
          <Button
            sx={{
              px: 6,
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
            }}
            variant='outlined'
            startIcon={<MdAdd />}
            onClick={() => setIsFormOpen(true)}
          >
            เพิ่มที่อยู่ใหม่
          </Button>
        </Box>
      )}

      {/* form สำหรับจัดการ */}
      <FormAddress
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isFormOpen={isFormOpen}
      />
    </Box>
  );
};

export default ShippingAddress;