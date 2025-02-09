'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, } from '@mui/material';
import { User } from '@/types/user';
import UsersTable from '@/components/admin/user/table/user-table';
import FilterSortSearch from '@/components/admin/user/function/filter-sort-search';

export default function CustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [customerId, setCustomerId] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      await axios.get(`/api/user?sortOrder=${sortOrder}`)
        .then((res) => {
          setUsers(res.data);
        })
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
    axios.get(`/api/user/${customerId}`)
      .then(res => {
        setUsers(Array.isArray(res.data) ? res.data : [res.data])
      }).catch(() => {
        setUsers([]);
      })
  }, [customerId]);

  const handleDeleteCustomer = (customerId: number) => {
    if (!customerId) return;
    try {
      axios.delete(`/api/user/${customerId}`).then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== customerId))
      }).catch(err => {
        console.error(err)
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box sx={{ bgcolor: "primary.dark", minHeight: "100vh", py: 2, px: 6 }}>
      <Typography variant="h5" mb={2} fontWeight={800} gutterBottom>
        Users
      </Typography>

      {/* <FilterSortSearch /> */}
      <UsersTable users={users as any} loading={loading} />
    </Box>
  )
}