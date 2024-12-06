"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Categories, Propertie } from '@/types/product';
import { BiEdit } from 'react-icons/bi';

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  TablePagination,
  Tooltip,
  alpha,
  Toolbar,
  Checkbox,
  IconButton
} from '@mui/material';
import { MdDelete } from 'react-icons/md';

const CategorysPage = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [properties, setProperties] = useState<Propertie[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const fetchCategories = () => {
    axios.get('/api/categories').then((res) => setCategories(res.data));
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
        });
    } catch (err) {
      console.log('Error during save:', err);
    }
  };

  const handleEditCategory = (category: Categories) => {
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

      {/* Categories Table */}
      <TableContainer component={Paper} sx={{
        mt: 4,
        overflowX: "auto",
        width: "100%",
        display: "block",
        tableLayout: "fixed",
        maxWidth: "100%",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: selected.length > 0 ? (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) : "transparent",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {selected.length > 0 ? (
              <Typography sx={{ flex: 1 }} color="inherit" variant="subtitle1">
                {selected.length} selected
              </Typography>
            ) : (
              <Typography sx={{ flex: 1 }} variant="h6" id="tableTitle">
                Categories <Box component={"span"} sx={{ fontSize: "12px", color: "gray" }}>({categories.length})</Box>
              </Typography>
            )}
          </Box>
          {selected.length > 0 && (
            <Tooltip title="Delete">
              <Button
                variant="contained"
                color="error"
                startIcon={<MdDelete />}
                size='small'
                sx={{
                  boxShadow: 3,
                  ":hover": { bgcolor: "red.700" },
                  fontWeight: 500
                }}
              >
                Delete
              </Button>
            </Tooltip>
          )}
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" size='small'>
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < categories.length}
                  checked={categories.length > 0 && selected.length === categories.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell size='small'>Category Id</TableCell>
              <TableCell size='small'>Category Name</TableCell>
              <TableCell size='small'>Parent Category</TableCell>
              <TableCell size='small'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => {
              const parentCategory = categories.find((cat) => cat.id === category.parentId);
              const isItemSelected = isSelected(category.id);

              return (
                <TableRow
                  key={category.id}
                  hover
                  role="checkbox"
                  onClick={(event) => handleClick(event, category.id)}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox" size='small'>
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  <TableCell sx={{ minWidth: { xs: "150px" } }} size='small'>{category.id}</TableCell>
                  <TableCell sx={{ minWidth: { xs: "150px" } }} size='small'>{category.name}</TableCell>
                  <TableCell sx={{ minWidth: { xs: "150px" } }} size='small'>{parentCategory?.name || '-'}</TableCell>
                  <TableCell sx={{ minWidth: { xs: "150px" } }} size='small'>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton color='primary' onClick={(e) => { handleEditCategory(category), e.stopPropagation() }}>
                        <BiEdit />
                      </IconButton>
                      <IconButton color='error' onClick={(e) => { handleDeleteCategory(category.id, category.name), e.stopPropagation() }}>
                        <MdDelete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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