'use client'
import React, { SetStateAction, useEffect, useState } from 'react'
import {
    Table,
    TableContainer,
    Typography,
    Box,
    Toolbar,
    Button,
} from "@mui/material"
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Product } from "@/types/product";
import Swal from 'sweetalert2'
import ProductTableHead from './table/product-table-head';
import ProductTableRow from './table/product-table-row';

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
    const [selectItem, setSelectItem] = useState<string[]>([]);

    const fetchProducts = () => {
        try {
            axios.get(`/api/product?sortOrder=${sortOrder}`).then((res) => {
                setProducts(res.data)
            });
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [sortOrder]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) { // ถ้ามีการเลือกทั้งหมด
            const allItems = products.map((product) => product.slug);
            setSelectItem(allItems);
            return;
        }
        setSelectItem([]);
    };

    const handleClick = (e: React.MouseEvent<unknown>, slug: string) => {
        const selectedIndex = selectItem.indexOf(slug); // หา index จาก slug ที่เลือก
        let newSelected: string[] = []; // สร้างตัวแปรที่เหมือนกันกับ selectItem เพื่อเก็บค่าที่เลือก

        if (selectedIndex === -1) { // ถ้าหา index ไม่เจอ
            newSelected = [...selectItem, slug] // ให้เพิ่ม slug ที่เลือกเข้าไป
        } else {
            newSelected = [...selectItem.slice(0, selectedIndex), ...selectItem.slice(selectedIndex + 1)]
            // newSelected = selectItem.filter((item) => item !== slug);
        }

        setSelectItem(newSelected);
    };

    const handleDeleteProduct = (slug: string, productName: string) => {
        Swal.fire({
            title: `คุณแน่ใจหรือไม่`,
            text: `คุณต้องการลบสินค้าชิ้นนี้ใข่ไหม: ${productName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ใข้',
            cancelButtonText: 'ยกเลิก',
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
            text: `คุณต้องการลบ ${selectItem.length} รายการที่เลือกหรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ใช่, ลบรายการเหล่านี้!",
            cancelButtonText: "ยกเลิก",
            confirmButtonColor: "#ed1616",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/product/`, { data: { slugs: selectItem } }).catch((error) => console.error(error))
                    // วิธีส่งข้อมูลที่ต้องการลบไปหลายตัว เนื่องจาก params รับค่าได้แค่ตัวเดียว
                    .then(() => {
                        setProducts((prev) => prev.filter(p => !selectItem.includes(p.slug)))
                        fetchProducts();
                        setSelectItem([]);
                    }).then(() => {
                        Swal.fire(
                            "Deleted!",
                            `${selectItem.length} items have been deleted.`,
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

    const isSelected = (slug: string) => selectItem.indexOf(slug) !== -1;

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
                    {selectItem.length > 0 ? (
                        <>
                            <Typography variant="h5">{selectItem.length} Selected</Typography>
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
                        <Typography variant="h5">Products</Typography>
                    )}
                </Box>
                <Table size="small">
                    <ProductTableHead
                        handleSelectAllClick={handleSelectAllClick}
                        products={products}
                        selected={selectItem}
                    />
                    <ProductTableRow
                        handleClick={handleClick}
                        handleDeleteProduct={handleDeleteProduct}
                        isSelected={isSelected}
                        page={page}
                        products={products}
                        rowsPerPage={rowsPerPage}
                    />
                </Table>
            </TableContainer>
        </Toolbar>
    )
}

export default ProductTable