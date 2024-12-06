'use client';
import React, { useState, useEffect } from 'react';
import { Product, Categories } from '@/types/product';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    Tooltip,
    TablePagination,
    Button,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

const EnhancedTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Product>('title');
    const [selected, setSelected] = useState<number[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const fetchProducts = () => {
        axios.get('/api/product/').then((res) => setProducts(res.data));
        axios.get('/api/categories').then((res) => setCategories(res.data));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = products.map((product) => product.id);
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

    const handleDeleteProduct = (slug: string, productName: string) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to delete: ${productName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#ed1616',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/product/${slug}`)
                    .then(() => fetchProducts())
                    .then(() =>
                        Swal.fire('Deleted!', `${productName} has been deleted.`, 'success')
                    )
                    .catch(() =>
                        Swal.fire('Error!', 'Something went wrong. Please try again.', 'error')
                    );
            }
        });
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.default' }}>
            <Paper sx={{ width: '100%', mb: 2, bgcolor: 'background.paper' }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(selected.length > 0 && {
                            bgcolor: (theme) =>
                                alpha(
                                    theme.palette.primary.main,
                                    theme.palette.action.activatedOpacity
                                ),
                        }),
                    }}
                >
                    {selected.length > 0 ? (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="subtitle1"
                            component="div"
                        >
                            {selected.length} selected
                        </Typography>
                    ) : (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Products <Box component={"span"} sx={{ fontSize: "12px", color: "gray" }}>({products.length})</Box>
                        </Typography>
                    )}
                    {selected.length > 0 && (
                        <Tooltip title="Delete">
                            <Button variant='outlined' sx={{ border: "none", bgcolor: "red", color: "white" }} startIcon={<MdDelete />}>Delete</Button>
                        </Tooltip>
                    )}
                </Toolbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={
                                            selected.length > 0 && selected.length < products.length
                                        }
                                        checked={
                                            products.length > 0 && selected.length === products.length
                                        }
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                                <TableCell>
                                    Product Name
                                </TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
                                const isItemSelected = isSelected(product.id);
                                const parentCategory = categories.find(
                                    (cat) => cat.id === product.categoryId
                                );
                                return (
                                    <TableRow
                                        key={product.id}
                                        hover
                                        onClick={(event) => handleClick(event, product.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>
                                            {product.categoryId ? parentCategory?.name : ''}
                                        </TableCell>
                                        <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Tooltip title="Edit">
                                                <Button
                                                    type='button'
                                                    href={`/admin/products/edit/${product.slug}`}
                                                    variant="outlined"
                                                    color="primary"
                                                    startIcon={<BiEdit />}
                                                    sx={{ ":hover": { bgcolor: "primary.main", color: "white" } }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Typography variant="body2">
                                                        Edit
                                                    </Typography>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button
                                                    onClick={(e) => { handleDeleteProduct(product.slug, product.title), e.stopPropagation() }}
                                                    variant="contained"
                                                    color="error"
                                                >
                                                    <Typography variant="body2">
                                                        Delete
                                                    </Typography>
                                                </Button>
                                            </Tooltip>
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
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default EnhancedTable;