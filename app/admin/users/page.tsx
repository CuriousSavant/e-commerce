'use client'
import React from 'react';
import { Box, Typography, } from '@mui/material';
import UsersTable from '@/components/admin/users/user-table';
import FilterSortSearch from '@/components/admin/users/filter-sort-search';
import CreateUserForm from '@/components/admin/users/create-user-form';
import useUser from '@/hooks/useUsers';

export default function Users() {
  const {
    userList, setUserList,
    userForm, setUserForm,
    formOpen, setFormOpen,
    errors, setErrors,
    searchQuery, setSearchQuery,
    sortOrder, setSortOrder,
    role, setRole,
    loading, setLoading,
    editingId, setEditingId,
    fetchUsers, handleChange,
    validateForm, handleReset,
    handleSignUp, handleDeleteUser,
    startEditing, latestUser, setLatestUser,
  } = useUser();

  return (
    <Box sx={{ bgcolor: "primary.dark", minHeight: "100vh", py: 2, px: 6 }}>
      <Typography variant="h5" mb={2} fontWeight={800} gutterBottom>
        {formOpen ? (editingId ? "แก้ไขข้อมูลผู้ใช้" : "สร้างผู้ใช้") : "รายชื่อผู้ใช้ทั้งหมด"}
      </Typography>

      {formOpen ? (
        <CreateUserForm
          formOpen={formOpen}
          editingId={editingId}
          errors={errors}
          userForm={userForm}
          setErrors={setErrors}
          setFormOpen={setFormOpen}
          setEditingId={setEditingId}
          handleChange={handleChange}
          handleSignUp={handleSignUp}
          setUserForm={setUserForm}
        />
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
          <UsersTable
            userList={userList}
            loading={loading}
            startEditing={startEditing}
            handleDeleteUser={handleDeleteUser}
          />
        </>
      )}
    </Box>
  )
}