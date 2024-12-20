import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Category } from '@/types/product';
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
import Loading from './loading';

interface CategoriesTableProps {
    categories: Category[]; // ข้อมูลหมวดหมู่ทั้งหมด
    selected: number[]; // รายการ ID ของหมวดหมู่ที่ถูกเลือก
    page: number; // หน้าแสดงผลของตาราง
    rowsPerPage: number; // จำนวนแถวที่แสดงต่อหน้า
    isSelected: (id: number) => boolean;
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void; // ฟังก์ชันสำหรับเลือกทั้งหมดในตาราง
    handleClick: (event: React.MouseEvent<unknown>, id: number) => void; // ฟังก์ชันเมื่อคลิกเลือกหมวดหมู่
    // handleChangePage: (event: unknown, newPage: number) => void; // ฟังก์ชันสำหรับเปลี่ยนหน้า
    // handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void; // ฟังก์ชันสำหรับเปลี่ยนจำนวนแถวที่แสดงต่อหน้า
    handleEditCategory: (category: Category) => void; // ฟังก์ชันสำหรับแก้ไขหมวดหมู่ที่ถูกเลือก
    handleDeleteCategory: (id: number, name: string) => void; // ฟังก์ชันสำหรับลบหมวดหมู่ที่ถูกเลือก
    loading: boolean;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
    categories,
    selected,
    page,
    rowsPerPage,
    handleSelectAllClick,
    handleClick,
    handleDeleteCategory,
    handleEditCategory,
    isSelected,
    loading,
}) => {
    return (
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
            {loading ? (
                <Loading />
            ) : (
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
                                    onClick={(event: any) => handleClick(event, category.id)}
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
            )}
        </TableContainer>
    );
};

export default CategoriesTable;