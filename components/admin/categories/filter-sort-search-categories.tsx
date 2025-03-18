import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, MenuItem, Select, Stack, TextField } from "@mui/material";
import React from "react";

type FilterSortSearchProductProps = {
    sortOrder: 'asc' | 'desc';
    query: string;
    statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE';
    dialogOpen: boolean;

    setStatusFilter: React.Dispatch<React.SetStateAction<'ALL' | 'ACTIVE' | 'INACTIVE'>>;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const FilterSortSearchCategories: React.FC<FilterSortSearchProductProps> = ({
    sortOrder, query,
    setQuery, setSortOrder,
    setStatusFilter, statusFilter,
    dialogOpen, setDialogOpen,
}) => {
    return (
        <Stack direction={{ xs: "column", md: "row" }} justifyContent={"space-between"} alignItems={"center"} mt={{ xs: 4, md: 2 }}>
            <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} gap={2} width={"100%"}>
                <TextField
                    size="small"
                    placeholder="Search by name"
                    sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "2px solid #4F4F4F" }}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query || ""}
                    InputProps={{
                        sx: {
                            "&::placeholder": {
                                color: "#C2C2C2",
                                opacity: 1,
                                fontSize: 14,
                            },
                            color: "white"
                        },
                        startAdornment: (
                            <InputAdornment position="start" >
                                <Search sx={{ color: "#c2c2c2", fontSize: 22 }} />
                            </InputAdornment>
                        )
                    }}
                />
                <Select
                    size='small'
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    value={sortOrder}
                    sx={{
                        bgcolor: "secondary.dark",
                        border: "2px solid #4F4F4F",
                        color: "#C2C2C2",
                        "& .MuiSelect-icon": { color: "white" },
                    }}>
                    <MenuItem value={"asc"}>เก่า - ใหม่</MenuItem>
                    <MenuItem value={"desc"}>ใหม่ - เก่า</MenuItem>
                </Select>

                <Select
                    size='small'
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    value={statusFilter || "ALL"}
                    sx={{
                        bgcolor: "secondary.dark",
                        border: "2px solid #4F4F4F",
                        color: "#C2C2C2",
                        "& .MuiSelect-icon": { color: "white" }
                    }}>
                    <MenuItem value={"ALL"}>All</MenuItem>
                    <MenuItem value={"ACTIVE"}>Active</MenuItem>
                    <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
                </Select>
            </Box>

            <Button sx={{ bgcolor: "primary.main", color: "white", px: 3, alignSelf: "end", mt: 4 }} onClick={() => setDialogOpen(!dialogOpen)}>สร้างหมวดหมู่</Button>
        </Stack>
    );
};

export default FilterSortSearchCategories;