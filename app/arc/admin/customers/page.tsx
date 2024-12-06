'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import { User } from '@/types/user';
import { BiEdit } from 'react-icons/bi';

export default function CustomersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [customerId, setCustomerId] = useState<string>('')

  const fetchUsers = () => {
    axios.get('/api/users')
      .then((res) => {
        setUsers(res.data)
      })
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  useEffect(() => {
    if (customerId.trim() === '') {
      return;
    }
  })

  useEffect(() => {
    axios.get(`/api/users/${customerId}`)
      .then(res => {
        setUsers(Array.isArray(res.data) ? res.data : Array(res.data))
      }).catch(err => {
        setUsers([]);
      })
  }, [customerId]);

  const formatDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',  // ชื่อเดือนแบบย่อ
    day: 'numeric',  // วันที่
    year: 'numeric', // ปี
    hour: 'numeric', // ชั่วโมง
    minute: 'numeric', // นาที
    hour12: true,    // ใช้รูปแบบ 12 ชั่วโมง
  })

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Customers
      </Typography>

      {/* Filter and Actions */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <TextField
          label="Customer ID"
          size="small"
          sx={{ width: 250 }}
          onChange={(e) => setCustomerId(e.target.value)}
          value={customerId}
        />
      </Box>

      {/* Customer Table */}
      <TableContainer
        sx={{
          overflowX: "auto",
          width: "100%",
          display: "block",
          tableLayout: "fixed",
          maxWidth: "100%",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Customer Id</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Name</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Phone Numbers</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: "180px" }}>Created at</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Status</TableCell>
              <TableCell size="small" sx={{ pt: 1.5, minWidth: { xs: "150px", md: "180px" } }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((product) => (
              <TableRow key={product.id}>
                <TableCell size="small">
                  <Typography
                    sx={{
                      color: "#4F46E5",
                      fontWeight: "bold",
                    }}
                  >
                    {product.id}
                  </Typography>
                </TableCell>
                <TableCell size="small">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      alt={product.name}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                      }}
                    >a</Avatar>
                    <Box
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        width: "100%",
                        fontSize: "13px",
                      }}
                    >
                      <Typography fontWeight="bold">{product.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{product.phone}</TableCell>
                <TableCell>{formatDate.format(new Date(product.createdAt))}</TableCell>
                <TableCell>
                  <Chip
                    color={product.emailVerified !== null ? "success" : "error"}
                    label={product.emailVerified !== null ? "Verified" : "Not Verified"}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="ว่าจะทำหน้าสำหรับแก้ไข user และ เพิ่มรายละเอียดเกี่ยวกับ สินค้าในคะกร้ามีกี่ชิ้น, และ อื่นๆ">
                    <IconButton>
                      <BiEdit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}