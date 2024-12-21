'use client'
import React, { SetStateAction, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Chip,
    IconButton,
    Typography,
    Box,
    Toolbar,
    Button,
} from "@mui/material"
import { MdDelete } from "react-icons/md";
import { BiEdit, BiSortDown, BiSortUp } from "react-icons/bi";
import axios from "axios";
import { Product } from "@/types/product";
import Swal from 'sweetalert2'
import Link from 'next/link';

interface RowPageProps {
    products: Product[];
    setProducts: React.Dispatch<SetStateAction<Product[]>>;
    page: number;
    rowsPerPage: number;
    sortOrder: 'asc' | 'desc';
    toggleSortOrder: () => void;
}

const ProductTable: React.FC<RowPageProps> = ({
    page,
    rowsPerPage,
    products,
    setProducts,
    sortOrder,
    toggleSortOrder,
}) => {
    const [selected, setSelected] = useState<string[]>([]);

    const fetchProducts = () => {
        axios.get(`/api/product?sortOrder=${sortOrder}`).then((res) => setProducts(res.data));
    };

    useEffect(() => {
        fetchProducts();
    }, [sortOrder]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = products.map((product) => product.slug);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, slug: string) => {
        const selectedIndex = selected.indexOf(slug);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, slug);
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

    const handleAllDelete = () => {
        Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: `คุณต้องการลบ ${selected.length} รายการที่เลือกหรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ใช่, ลบรายการเหล่านี้!",
            cancelButtonText: "ยกเลิก",
            confirmButtonColor: "#ed1616",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/product/`, { data: { slugs: selected } }).catch((error) => console.error(error))
                    // วิธีส่งข้อมูลที่ต้องการลบไปหลายตัว เนื่องจาก params รับค่าได้แค่ตัวเดียว
                    .then(() => {
                        setProducts((prev) => prev.filter(p => !selected.includes(p.slug)))
                        fetchProducts();
                        setSelected([]);
                    }).then(() => {
                        Swal.fire(
                            "Deleted!",
                            `${selected.length} items have been deleted.`,
                            "success"
                        );
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Error!",
                            "Some items could not be deleted. Please try again.",
                            "error"
                        )
                    });
            }
        });
    }

    const isSelected = (slug: string) => selected.indexOf(slug) !== -1;

    return (
        <Toolbar>
            <TableContainer
                sx={{
                    overflowX: "auto",
                    width: "100%",
                    display: "block",
                    maxWidth: "100%",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, py: 1, minHeight: 64 }}>
                    {selected.length > 0 ? (
                        <>
                            <Typography variant="h5">{selected.length} Selected</Typography>
                            <Button
                                variant='contained'
                                color='error'
                                size='large'
                                onClick={() => handleAllDelete()}
                                sx={{
                                    textTransform: "none",
                                    borderColor: "#D1D5DB",
                                }}
                            >
                                <MdDelete color="#fff" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5">Products</Typography>
                            {/* Filter */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <IconButton
                                    onClick={toggleSortOrder}
                                    sx={{
                                        textTransform: "none",
                                        borderColor: "#D1D5DB",
                                        color: "#4B5563",
                                        ":hover": {
                                            borderColor: "#9CA3AF",
                                            backgroundColor: "#F3F4F6",
                                        },
                                    }}
                                >
                                    {sortOrder === "asc" ? <BiSortDown /> : <BiSortUp />}
                                </IconButton>
                            </Box>
                        </>
                    )}
                </Box>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" size="small" sx={{ pt: 1.5 }}>
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < products.length}
                                    checked={products.length > 0 && selected.length === products.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell size="small" sx={{ pt: 1.5, width: "140px" }}>Product ID</TableCell>
                            <TableCell size="small" sx={{ pt: 1.5 }}>Name</TableCell>
                            <TableCell size="small" sx={{ pt: 1.5 }}>Category</TableCell>
                            <TableCell size="small" sx={{ pt: 1.5 }}>Stock</TableCell>
                            <TableCell size="small" sx={{ pt: 1.5 }}>Price</TableCell>
                            <TableCell size="small" sx={{ pt: 1.5 }}>Status</TableCell>
                            <TableCell size="small" sx={{ pt: 1.5 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
                            const selectedRow = isSelected(product.slug);
                            return (
                                <TableRow
                                    key={product.id}
                                    sx={{
                                        backgroundColor: selectedRow ? "#e3f2fd" : "inherit",
                                        "&:hover": {
                                            backgroundColor: selectedRow ? "#d0ebfa" : "#f5f5f5",
                                        },
                                    }}
                                >
                                    <TableCell padding="checkbox" size="small">
                                        <Checkbox
                                            checked={selectedRow}
                                            onClick={(event) => handleClick(event, product.slug)}
                                        />
                                    </TableCell>
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
                                    <TableCell sx={{ minWidth: 200 }} size="small">
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <img
                                                src={product.image?.[0]}
                                                alt={product.title}
                                                style={{
                                                    width: 40,
                                                    height: 45,
                                                    borderRadius: "5px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <Typography
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
                                                {product.title}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell size="small">
                                        <Chip
                                            label={"unknown"}
                                            sx={{
                                                backgroundColor: "#F3F4F6",
                                                color: "#374151",
                                                fontWeight: "bold",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell size="small">{product.stock}</TableCell>
                                    <TableCell size="small">${product.price.toLocaleString('th-TH')}</TableCell>
                                    <TableCell size="small">
                                        <Chip
                                            label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                                            color={product.stock > 0 ? "success" : "error"}
                                            sx={{ fontWeight: "bold" }}
                                        />
                                    </TableCell>
                                    <TableCell size="small" sx={{ display: "flex" }}>
                                        <IconButton>
                                            <Link href={`/arc/admin/products/edit/${product.slug}`}>
                                                <BiEdit color="#1976d2" />
                                            </Link>
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteProduct(product.slug, product.title)}>
                                            <MdDelete color="#FF0000" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Toolbar>
    )
}

export default ProductTable