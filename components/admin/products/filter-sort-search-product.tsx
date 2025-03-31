import { Category } from "@/types/product";
import { Add, Search } from "@mui/icons-material";
import { Box, Button, FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import React from "react";

type FilterSortSearchProductProps = {
    sortOrder: string;
    formOpen: boolean;
    query: string;
    categories: Category[];
    categoryFilter: string;
    statusFilter: string;
    priceFilter: string;

    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSortOrder: () => void;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    setPriceFilter: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const FilterSortSearchProduct: React.FC<FilterSortSearchProductProps> = ({
    sortOrder, formOpen, query, categoryFilter,
    statusFilter, priceFilter, categories,
    setQuery, setFormOpen, toggleSortOrder,
    setCategoryFilter, setStatusFilter, setPriceFilter,
    setPage,
}) => {
    return (
        <Stack direction={"column"} mt={{ xs: 4, md: 2 }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center" }} mb={{ xs: 4, md: 2 }}>
                <Box sx={{ display: "flex", gap: 2, width: "100%", mb: { xs: 3, md: 0 } }}>
                    {/* Search Input */}
                    <TextField
                        size="small"
                        placeholder="Search by name"
                        sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "1px solid #4F4F4F", width: { xs: "100%", md: "440px" } }}
                        onChange={(e) => setQuery(e.target.value)}
                        value={query || ""}
                        InputProps={{
                            sx: {
                                "&::placeholder": { color: "#C2C2C2", opacity: 1, fontSize: 14 },
                                color: "white"
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "#c2c2c2", fontSize: 22 }} />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1, width: { xs: "100%", md: "auto" } }}>
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            backgroundColor: "primary.main",
                            ":hover": { backgroundColor: "primary.main" },
                            color: "white",
                            width: { xs: "100%", md: "auto" },
                            whiteSpace: "pre",
                        }}
                        startIcon={<Add />}
                        onClick={() => setFormOpen(!formOpen)}>
                        สร้างสินค้า
                    </Button>
                </Box>
            </Box>

            <Box display={'flex'} flexDirection={{ xs: "column", md: "row" }} gap={2} alignItems={'center'} mb={4}>
                {/* Sort Order */}
                <FormControl size="small" sx={{ width: { xs: "100%", md: "auto" } }}>
                    <Select
                        value={sortOrder}
                        onChange={toggleSortOrder}
                        sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4f4f4f", borderRadius: 2, '& .MuiSelect-icon': { color: "white" } }}
                    >
                        <MenuItem value="asc">เก่า - ใหม่</MenuItem>
                        <MenuItem value="desc">ใหม่ - เก่า</MenuItem>
                    </Select>
                </FormControl>

                {/* Category Filter */}
                <FormControl size="small" sx={{ width: { xs: "100%", md: "auto" } }}>
                    <Select
                        value={categoryFilter || "all"}
                        onChange={(e: SelectChangeEvent) => { setCategoryFilter(e.target.value), setPage(1) }}
                        sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4f4f4f", borderRadius: 2, '& .MuiSelect-icon': { color: "white" } }}
                    >
                        <MenuItem value="all">หมวดหมู่ทั้งหมด</MenuItem>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No categories available</MenuItem>
                        )}
                    </Select>
                </FormControl>

                {/* Status Filter */}
                <FormControl size="small" sx={{ width: { xs: "100%", md: "auto" } }}>
                    <Select
                        value={statusFilter || ""}
                        onChange={(e: SelectChangeEvent) => { setStatusFilter(e.target.value as 'active' | 'inactive'), setPage(1) }}
                        sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4f4f4f", borderRadius: 2, '& .MuiSelect-icon': { color: "white" } }}
                    >
                        <MenuItem value="all">สถานะทั้งหมด</MenuItem>
                        <MenuItem value="active">เปิดใช้งาน</MenuItem>
                        <MenuItem value="inactive">ปิดใช้งาน</MenuItem>
                    </Select>
                </FormControl>

                {/* Price Filter */}
                <FormControl size="small" sx={{ width: { xs: "100%", md: "auto" } }}>
                    <Select
                        value={priceFilter || ""}
                        onChange={(e: SelectChangeEvent) => { setPriceFilter(e.target.value), setPage(1) }}
                        sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4f4f4f", borderRadius: 2, '& .MuiSelect-icon': { color: "white" } }}
                    >
                        <MenuItem value="all">กรองตามราคา(ค่าเริ่มต้น)</MenuItem>
                        <MenuItem value="low-high">ถูก - แพง</MenuItem>
                        <MenuItem value="high-low">แพง - ถูก</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Stack>
    );
};

export default FilterSortSearchProduct;