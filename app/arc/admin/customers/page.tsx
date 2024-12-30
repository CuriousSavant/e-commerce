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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { User } from '@/types/user';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

export default function CustomersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [customerId, setCustomerId] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('asc')

  const fetchUsers = () => {
    axios.get(`/api/users?sortOrder=${sortOrder}`)
      .then((res) => {
        setUsers(res.data)
      })
  }

  useEffect(() => {
    fetchUsers();
  }, [sortOrder])

  useEffect(() => {
    if (customerId.trim() === '') {
      return;
    }
  })

  useEffect(() => {
    axios.get(`/api/users/${customerId}`)
      .then(res => {
        setUsers(Array.isArray(res.data) ? res.data : [res.data])
      }).catch(() => {
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

  const handleDeleteCustomer = (customerId: number) => {
    if (!customerId) return;
    try {
      axios.delete(`/api/users/${customerId}`).then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== customerId))
      }).catch(err => {
        console.error(err)
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Customers
      </Typography>

      {/* Filter and Actions */}
      <Box
        display="flex"
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
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort Order"
          >
            <MenuItem value="asc">Asc</MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
          </Select>
        </FormControl>
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell size="small">
                  <Typography
                    sx={{
                      color: "#4F46E5",
                      fontWeight: "bold",
                    }}
                  >
                    {user.id}
                  </Typography>
                </TableCell>
                <TableCell size="small">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      alt={user.name}
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
                      <Typography fontWeight="bold">{user.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{user.phone || "-"}</TableCell>
                <TableCell>{formatDate.format(new Date(user.createdAt))}</TableCell>
                <TableCell>
                  <Chip
                    color={user.emailVerified !== null ? "success" : "error"}
                    label={user.emailVerified !== null ? "Verified" : "Not Verified"}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="ว่าจะทำหน้าสำหรับแก้ไข user และ เพิ่มรายละเอียดเกี่ยวกับ สินค้าในคะกร้ามีกี่ชิ้น, และ อื่นๆ">
                    <IconButton>
                      <BiEdit color='#0f63e9' />
                    </IconButton>
                  </Tooltip>
                  <IconButton onClick={() => handleDeleteCustomer(user.id)}>
                    <MdDelete color='red' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}