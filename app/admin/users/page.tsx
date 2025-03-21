'use client'
import React from 'react';
import { Box, TablePagination, Typography, } from '@mui/material';
import UsersTable from '@/components/admin/users/user-table';
import FilterSortSearch from '@/components/admin/users/filter-sort-search';
import CreateUserForm from '@/components/admin/users/create-user-form';
import useUser from '@/hooks/useUsers';
import { usePagination } from '@/app/context/PaginationContext';

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
    userCount,
  } = useUser();

  const { handleChangePage, handleChangeRowsPerPage, page, pageSize, } = usePagination();

  console.log(userCount)

  return (
    <Box sx={{ py: 2, px: { xs: 2, md: 6 } }}>
      <Typography variant="h5" mb={{ xs: 4, md: 2 }} fontWeight={800} gutterBottom>
        {formOpen ? (editingId ? "แก้ไขข้อมูลผู้ใช้" : "สร้างผู้ใช้") : "รายชื่อผู้ใช้ทั้งหมด"}
      </Typography>

      {!formOpen ? ( // ถ้าไม่ได้เปิด form
        <>
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userCount}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ disabled: (page * pageSize) >= userCount }}
            backIconButtonProps={{ disabled: page <= 1 }}
            sx={{
              color: "white",
              "& .MuiSvgIcon-root": { color: "white" },
              "& .MuiSelect-icon": { color: "white" },
              "& .Mui-disabled": { color: "gray" },
            }}
          />
        </>
      ) : (
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
      )}
    </Box>
  )
}