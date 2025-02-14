'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, } from '@mui/material';
import { User } from '@/types/user';
import UsersTable from '@/components/admin/user/table/user-table';
import FilterSortSearch from '@/components/admin/user/filter-sort-search';
import { SortType, Role } from '@/types/components/filter-sort';
import CreateUserForm from '@/components/admin/user/form/create-user-form';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // search
  const [sortOrder, setSortOrder] = useState<SortType>('asc'); // sort
  const [role, setRole] = useState<Role>('all') // filter by role
  const [loading, setLoading] = useState<boolean>(true);

  const [formOpen, setFormOpen] = useState<boolean>(false);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      await axios.get(`/api/user?sortOrder=${sortOrder}&query=${searchQuery}&role=${role}`)
        .then((res) => { setUsers(res.data) })
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [sortOrder, searchQuery, role])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
  })

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
        {formOpen ? 'Create User' : 'Users'}
      </Typography>

      {formOpen ? (
        <CreateUserForm formOpen={formOpen} setFormOpen={setFormOpen} fetchUsers={fetchUsers} />
      ) : (
        <>
          {/* <FilterSortSearch /> */}
          <FilterSortSearch
            setSortOrder={setSortOrder}
            sortOrder={sortOrder}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            setRole={setRole}
            role={role}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
          />

          {/* Table */}
          <UsersTable users={users as any} loading={loading} />
        </>
      )}
    </Box>
  )
}