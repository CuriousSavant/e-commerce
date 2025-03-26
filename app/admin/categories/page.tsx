"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import CategoriesTable from '@/components/admin/categories/table/category-table';
import { Category } from '@/types/product';
import { Box, TablePagination, Typography } from '@mui/material';
import FormCreateCategory from '@/components/admin/categories/form-create-category';
import FilterSortSearchCategories from '@/components/admin/categories/filter-sort-search-categories';
import { usePagination } from '@/context/PaginationContext';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [parentId, setParentId] = useState<number | null>(null);
  const [status, setStatus] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true)

  const [query, setQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');

  const [categoriesCount, setCategoriesCount] = useState<number>(0);

  const { handleChangePage, handleChangeRowsPerPage, page, pageSize } = usePagination();

  const fetchCategories = () => {
    setLoading(true);
    axios.get(`/api/categories?q=${query}&sortOrder=${sortOrder}&status=${statusFilter}&page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        setCategories(res.data.categories)
        setCategoriesCount(res.data.categoriesCount)
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, [query, statusFilter, sortOrder, page, pageSize]);

  // function สำหรับสร้าง category และ update
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: categoryName,
      parentId: parentId,
      status: status ? "ACTIVE" : "INACTIVE",
    };

    setLoading(true);
    (editId
      ? axios.put(`/api/categories/${editId}`, payload)
      : axios.post('/api/categories', payload)
    )
      .then(() => {
        fetchCategories();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        setCategoryName("");
        setParentId(null);
        setEditId(null);
        setDialogOpen(false);
        setStatus(true);
      });
  };

  const startEditingCategory = (category: Category) => {
    setEditId(category.id);
    setCategoryName(category.name);
    setParentId(category.parentId);
    setStatus(category.status === "ACTIVE" ? true : false);
    setDialogOpen(!dialogOpen);
  };

  const handleDeleteCategory = async (categoryId: number, categoryName: string) => {
    try {
      const result = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: `คุณต้องการลบหมวดหมู่ "${categoryName}" ใช่หรือไม่`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใข่, ต้องการลบหมวดหมู่นี้",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#ed1616",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/categories/${categoryId}`);
        setCategories((prev) => prev.filter((category) => category.id !== categoryId));
        Swal.fire("ลบหมวดหมู่สำเร็จ", `หมวดหมู่ ${categoryName} ถูกลบเป็นที่เรียบร้อย`, "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบหมวดหมู่ได้ กรุณาลองอีกครั้ง", "error");
    }
  };

  return (
    <Box py={2} px={{ xs: 2, md: 6 }}>
      <Typography variant="h5" fontWeight={700} mb={{ xs: 4, md: 2 }}>
        หมวดหมู่
      </Typography>

      <FilterSortSearchCategories {...{
        query, setQuery, setSortOrder,
        setStatusFilter, sortOrder, setStatus, dialogOpen,
        setDialogOpen, statusFilter
      }} />

      <FormCreateCategory
        {...{
          categories, dialogOpen, editId,
          categoryName, parentId, setDialogOpen,
          setEditId, setCategoryName, setParentId,
          setStatus, status, handleCreateCategory,
        }}
      />

      <CategoriesTable
        categories={categories}
        handleDeleteCategory={handleDeleteCategory}
        startEditingCategory={startEditingCategory}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        loading={loading}
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={categoriesCount}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ disabled: (page * pageSize) >= categoriesCount }}
        backIconButtonProps={{ disabled: page <= 1 }}
        sx={{
          color: "white",
          "& .MuiSvgIcon-root": { color: "white" },
          "& .MuiSelect-icon": { color: "white" },
          "& .Mui-disabled": { color: "gray" },
          overflowX: "hidden",
        }}
      />
    </Box>
  );
};

export default Categories;