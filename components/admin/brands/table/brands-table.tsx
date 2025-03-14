import React from 'react';
import { Table, TableBody, TableContainer, Paper, Box, Typography, TableRow, TableCell } from '@mui/material';
import BrandsTableHead from './brands-table-head';
import BrandsTableRow from './brands-table-row';
import { Brand } from '@/types/brand';

interface BrandsTableRow {
    brands: Brand[];
    // page: number; // หน้าแสดงผลของตาราง
    // rowsPerPage: number; // จำนวนแถวที่แสดงต่อหน้า
    // handleChangePage: (event: unknown, newPage: number) => void; // ฟังก์ชันสำหรับเปลี่ยนหน้า
    // handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void; // ฟังก์ชันสำหรับเปลี่ยนจำนวนแถวที่แสดงต่อหน้า
    loading: boolean;
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    startEditingBrand: (brand: Brand) => void; // ฟังก์ชันสำหรับแก้ไขหมวดหมู่ที่ถูกเลือก
    handleDeleteBrand: (id: number, name: string) => void; // ฟังก์ชันสำหรับลบหมวดหมู่ที่ถูกเลือก
}

const BrandsTable: React.FC<BrandsTableRow> = ({
    brands,
    // page,
    // rowsPerPage,
    handleDeleteBrand,
    startEditingBrand,
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
            overflowX: "auto",
            width: "100%",
            display: "block",
            maxWidth: "100%",
        }}>
            <Table>
                <BrandsTableHead />
                <TableBody>
                    {loading ? Array.from({ length: 6 }).map((_, index) => (
                        <BrandsTableRow key={index} {...{ handleDeleteBrand, startEditingBrand, loading }} />
                    )) : (
                        brands.length > 0 ?
                            brands.map((brand) => (
                                <BrandsTableRow key={brand.id} {...{ handleDeleteBrand, loading, startEditingBrand, brand }} />
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ border: 0, height: 300 }}>
                                        <Box sx={{ color: "white", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                            <Typography variant="body1">ไม่พบแบรนด์</Typography> <Typography variant='body1' color='primary' sx={{ ml: 1, cursor: "pointer" }} onClick={() => setDialogOpen(!dialogOpen)}>สร้างเลย!</Typography>
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

export default BrandsTable;