"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Category, Propertie } from '@/types/product';

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Grid,
  TablePagination,
} from '@mui/material';
import CategoriesTable from '@/components/admin-page/categories/category-table';

const CategorysPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [properties, setProperties] = useState<Propertie[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const fetchCategories = () => {
    setLoading(true);
    axios.get('/api/categories')
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: categoryName,
      parentId: parentId,
      properties: properties.map(({ id, name, value }) => ({
        id,
        name,
        value,
      })),
    };

    try {
      editId
        ? axios.put(`/api/categories/${editId}`, payload).then(() => {
          setCategoryName('');
          setParentId(null);
          fetchCategories();
          setEditId(null);
          setProperties([]);
        })
        : axios.post('/api/categories', payload).then((res) => {
          setCategoryName('');
          setParentId(null);
          setCategories([res.data, ...categories]);
          setProperties([]);
        })
    } catch (err) {
      console.error('Error during save:', err);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditId(category.id);
    setCategoryName(category.name);
    setParentId(category.parentId);
    setProperties(
      category.properties.map(({ id, name, value }) => ({
        id: id,
        name: name,
        value: value,
      }))
    );
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  const handleDeleteCategory = (id: number, name: string) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to delete: ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      focusConfirm: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ed1616',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/categories/${id}`)
          .then(() => {
            fetchCategories();
            Swal.fire('Deleted!', `${name} has been deleted.`, 'success');
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
          });
      }
    });
  };

  const handleAddProperty = () => {
    setProperties((prev) => [...prev, { id: prev.length + 1, name: '', value: '' }]);
  };

  const handlePropertyChange = (index: number, type: 'value' | 'name', value: string) => {
    setProperties((prev) =>
      prev.map((property, i) =>
        i === index ? { ...property, [type]: value } : property
      )
    );
  };

  const handleDeleteProperty = (indexToRemove: number | undefined) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== indexToRemove));
  };

  const onCancel = () => {
    setCategoryName('');
    setParentId(null);
    setEditId(null);
    setProperties([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }


  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = categories.map((product) => product.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;


  return (
    <Box p={2}>
      <Typography variant="h5" mb={2} fontWeight={700}  >
        {editId !== null ? 'Edit Category' : 'New Category'}
      </Typography>
      <form onSubmit={handleCreateCategory} className='border border-[#ddd] rounded-lg p-6'>
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category Name"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              size='small'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={parentId || ''}
              onChange={(e) => setParentId(Number(e.target.value) || null)}
              size='small'
              displayEmpty
              fullWidth
            >
              <MenuItem value="">
                <em>Select Parent Category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* Properties */}
        <Box mb={3}>
          <Typography variant="h6">Properties</Typography>
          <Button variant="contained" onClick={handleAddProperty} sx={{ mb: 2 }}>
            Add New Property
          </Button>
          {properties.map((property, index) => (
            <Grid container spacing={2} key={index} alignItems="center" mb={2}>
              <Grid item xs={5}>
                <TextField
                  label="Name"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyChange(index, 'name', e.target.value)
                  }
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Value"
                  value={property.value}
                  onChange={(e) =>
                    handlePropertyChange(index, 'value', e.target.value)
                  }
                  size='small'
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteProperty(property.id)}
                >
                  ✕
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>

        <Box display="flex" gap={2}>
          {editId && (
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="contained" type="submit">
            Save Category
          </Button>
        </Box>
      </form>

      <CategoriesTable
        categories={categories}
        handleClick={handleClick}
        handleDeleteCategory={handleDeleteCategory}
        handleEditCategory={handleEditCategory}
        handleSelectAllClick={handleSelectAllClick}
        page={page}
        rowsPerPage={rowsPerPage}
        selected={selected}
        isSelected={isSelected}
        loading={loading}
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ bgcolor: 'background.paper' }}
      />
    </Box>
  );
};

export default CategorysPage;