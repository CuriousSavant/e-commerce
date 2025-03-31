"use client"
import { Role, SortType } from '@/components/admin/users/types/filter-sort-search';
import { Add, Search } from '@mui/icons-material';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputAdornment,
} from '@mui/material';
import React from 'react';

interface ITrinity {
    sortOrder: SortType;
    searchQuery: string;
    role: Role;
    formOpen: boolean;
    setSortOrder: React.Dispatch<React.SetStateAction<SortType>>;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setRole: React.Dispatch<React.SetStateAction<Role>>
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const FilterSortSearch: React.FC<ITrinity> = ({
    setSortOrder,
    sortOrder,
    searchQuery,
    setSearchQuery,
    setRole,
    role,
    setFormOpen,
    formOpen,
    setPage,
}) => {
    return (
        <Box display={"flex"} justifyContent="space-between" flexDirection={{ xs: "column", md: "row" }} alignItems="center" mb={6}>
            <Box display={"flex"} gap={2} flexDirection={{ xs: "column", md: "row" }} width={{ xs: "100%", md: "auto" }}>
                {/* Search */}
                <TextField
                    size="small"
                    placeholder="Search by id, name, email"
                    sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "2px solid #4F4F4F" }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery || ""}
                    InputProps={{
                        sx: {
                            "&::placeholder": {
                                color: "#C2C2C2",
                                opacity: 1,
                                fontSize: 14,
                            },
                            color: "white",
                        },
                        startAdornment: (
                            <InputAdornment position="start" >
                                <Search sx={{ color: "#c2c2c2", fontSize: 22 }} />
                            </InputAdornment>
                        )
                    }}
                />

                {/* Filters By Role */}
                <Select
                    size='small'
                    onChange={(e) => { setRole(e.target.value as Role), setPage(1) }}
                    value={role}
                    sx={{
                        bgcolor: "secondary.dark",
                        border: "2px solid #4F4F4F",
                        color: "#C2C2C2",
                        "& .MuiSelect-icon": { color: "white" }
                    }}>
                    <MenuItem value={"all"}>บทบาททั้งหมด</MenuItem>
                    <MenuItem value={"member"}>Member</MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>

                <Select
                    size='small'
                    onChange={(e) => { setSortOrder(e.target.value as SortType), setPage(1) }}
                    value={sortOrder}
                    sx={{
                        bgcolor: "secondary.dark",
                        border: "2px solid #4F4F4F",
                        color: "#C2C2C2",
                        "& .MuiSelect-icon": { color: "white" }
                    }}>
                    <MenuItem value={"asc"}>เก่า - ใหม่</MenuItem>
                    <MenuItem value={"desc"}>ใหม่ - เก่า</MenuItem>
                </Select>
            </Box>

            <Button
                variant="contained"
                sx={{
                    bgcolor: "primary.main",
                    mt: { xs: 4, md: 0 },
                    alignSelf: "end"
                }}
                startIcon={<Add />}
                onClick={() => setFormOpen(!formOpen)}>
                สร้างผู้ใช้
            </Button>
        </Box>
    )
}

export default FilterSortSearch;