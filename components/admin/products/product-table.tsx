'use client'
import React from 'react'
import { Table, TableBody, TableContainer } from "@mui/material"
import { Product } from "@/types/product";
import ProductTableHead from './table/product-table-head';
import ProductTableRow from './table/product-table-row';

interface RowPageProps {
    products: Product[];
    page: number;
    rowsPerPage: number;
    selectItem: string[];
    loading: boolean;
    setSelectItem: React.Dispatch<React.SetStateAction<string[]>>;
    startEditing: (product: any) => void;
    handleAllDelete: () => void;
    handleDeleteProduct: (slug: string, productName: string) => void;
}

const ProductTable: React.FC<RowPageProps> = ({
    page,
    rowsPerPage,
    products,
    selectItem,
    setSelectItem,
    startEditing,
    loading,
    handleAllDelete,
    handleDeleteProduct,
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

    const isSelected = (slug: string) => selectItem.indexOf(slug) !== -1;


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