'use client'
import React, { SetStateAction } from 'react'
import { Table, TableBody, TableContainer } from "@mui/material"
import { Product } from "@/types/product";
import ProductTableHead from './table/product-table-head';
import ProductTableRow from './table/product-table-row';
import Swal from 'sweetalert2';
import axios from 'axios';

interface RowPageProps {
    products: Product[];
    page: number;
    rowsPerPage: number;
    selectItem: string[];
    loading: boolean;
    setProducts: React.Dispatch<SetStateAction<Product[]>>;
    setSelectItem: React.Dispatch<React.SetStateAction<string[]>>;
    startEditing: (product: any) => void;
    fetchProducts: () => void;
}

const ProductTable: React.FC<RowPageProps> = ({
    page,
    rowsPerPage,
    products,
    setProducts,
    selectItem,
    setSelectItem,
    startEditing,
    fetchProducts,
    loading,
}) => {
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

    const isSelected = (slug: string) => selectItem.indexOf(slug) !== -1;

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
                    .catch(() => {
                        Swal.fire(
                            "Error!",
                            "Some items could not be deleted. Please try again.",
                            "error"
                        )
                    });
            }
        });
    }

    return (
        <TableContainer
            sx={{
                overflowX: "auto",
                width: "100%",
                display: "block",
                maxWidth: "100%",
                borderRadius: "10px",
            }}
        >
            <Table size="small">
                <ProductTableHead
                    handleSelectAllClick={handleSelectAllClick}
                    products={products}
                    selected={selectItem}
                />
                <TableBody sx={{ bgcolor: "secondary.dark" }}>
                    {loading ?
                        Array.from({ length: 6 }).map((_, index) => (
                            <ProductTableRow
                                key={index}
                                loading={loading}
                                handleClick={handleClick}
                                handleDeleteProduct={handleDeleteProduct}
                                startEditing={startEditing}
                            />
                        )) : (
                            products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => {
                                const selectedRow = isSelected(product.slug!!);
                                return (
                                    <ProductTableRow
                                        key={index}
                                        loading={loading}
                                        handleClick={handleClick}
                                        handleDeleteProduct={handleDeleteProduct}
                                        product={product}
                                        startEditing={startEditing}
                                        selectedRow={selectedRow}
                                    />
                                );
                            })
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductTable