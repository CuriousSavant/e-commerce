import React from 'react';
import { Category } from '@/types/product';
import { Table, TableBody, TableContainer, Paper, Box, Typography, TableRow, TableCell } from '@mui/material';
import CategoriesTableHead from './categories-table-head';
import CategoriesTableRow from './categories-table-row';

interface CategoriesTableProps {
    categories: Category[]; // ข้อมูลหมวดหมู่ทั้งหมด
    // page: number; // หน้าแสดงผลของตาราง
    // rowsPerPage: number; // จำนวนแถวที่แสดงต่อหน้า
    // handleChangePage: (event: unknown, newPage: number) => void; // ฟังก์ชันสำหรับเปลี่ยนหน้า
    // handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void; // ฟังก์ชันสำหรับเปลี่ยนจำนวนแถวที่แสดงต่อหน้า
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    startEditingCategory: (category: Category) => void; // ฟังก์ชันสำหรับแก้ไขหมวดหมู่ที่ถูกเลือก
    handleDeleteCategory: (id: number, name: string) => void; // ฟังก์ชันสำหรับลบหมวดหมู่ที่ถูกเลือก
    loading: boolean;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
    categories,
    handleDeleteCategory,
    startEditingCategory,
    loading,
    dialogOpen,
    setDialogOpen,
}) => {
    return (
        <TableContainer component={Paper} sx={{
            mt: 4,
            tableLayout: "fixed",
            bgcolor: "secondary.dark",
            borderRadius: "6px",
            display: "block",
            maxWidth: "100%",
        }}>
            <Table>
                <CategoriesTableHead />
                <TableBody>
                    {loading ? Array.from({ length: 6 }).map((_, index) => (
                        <CategoriesTableRow key={index} {...{ handleDeleteCategory, startEditingCategory, loading }} />
                    )) : (
                        categories.length > 0 ?
                            categories.map((category) => {
                                const parentCategory = categories.find((cat) => cat.id === category.parentId);
                                return (
                                    <CategoriesTableRow key={category.id} {...{ category, handleDeleteCategory, parentCategory, startEditingCategory, loading }} />
                                );
                            }) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ border: 0, height: 300 }}>
                                        <Box sx={{ color: "white", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                            <Typography variant="body1">ไม่พบหมวดหมู่</Typography> <Typography variant='body1' color='primary' sx={{ ml: 1, cursor: "pointer" }} onClick={() => setDialogOpen(!dialogOpen)}>สร้างเลย!</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CategoriesTable;