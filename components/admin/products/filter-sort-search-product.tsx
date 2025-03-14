import { Search } from "@mui/icons-material";
import { Box, Button, FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

type FilterSortSearchProductProps = {
    sortOrder: string;
    formOpen: boolean;
    query: string;
    categoryFilter: string;
    statusFilter: string;
    priceFilter: string;

    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSortOrder: () => void;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    setPriceFilter: React.Dispatch<React.SetStateAction<string>>
}

const FilterSortSearchProduct: React.FC<FilterSortSearchProductProps> = ({
    sortOrder, formOpen, query, categoryFilter,
    statusFilter, priceFilter,
    setQuery, setFormOpen, toggleSortOrder,
    setCategoryFilter, setStatusFilter, setPriceFilter,
}) => {
    return (
        <Stack direction={"column"} mt={2}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} mb={2}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    {/* Search Input */}
                    <TextField
                        size="small"
                        placeholder="Search by name"
                        sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "1px solid #4F4F4F", width: "340px" }}
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

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={<AiOutlinePlus />}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#4F46E5",
                            ":hover": { backgroundColor: "#4338CA" },
                            color: "white",
                        }}
                        onClick={() => setFormOpen(!formOpen)}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

            <Box display={'flex'} gap={2} alignItems={'center'} mb={4}>
                {/* Sort Order */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
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
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                        value={categoryFilter}
                        onChange={(e: SelectChangeEvent) => setCategoryFilter(e.target.value)}
                        sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4f4f4f", borderRadius: 2, '& .MuiSelect-icon': { color: "white" } }}
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="fashion">Fashion</MenuItem>
                        <MenuItem value="home">Home</MenuItem>
                    </Select>
                </FormControl>

                {/* Status Filter */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        value={statusFilter || ""}
                        onChange={(e: SelectChangeEvent) => setStatusFilter(e.target.value as 'active' | 'inactive')}
                        sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4f4f4f", borderRadius: 2, '& .MuiSelect-icon': { color: "white" } }}
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>

                {/* Price Filter */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        value={priceFilter || ""}
                        onChange={(e: SelectChangeEvent) => setPriceFilter(e.target.value)}
                        sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4f4f4f", borderRadius: 2, '& .MuiSelect-icon': { color: "white" } }}
                    >
                        <MenuItem value="all">Filter Price</MenuItem>
                        <MenuItem value="low-high">Low - High</MenuItem>
                        <MenuItem value="high-low">High - Low</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Stack>
    );
};

export default FilterSortSearchProduct;