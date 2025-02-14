import { Role, SortType } from '@/types/components/filter-sort';
import { Search } from '@mui/icons-material';
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
}) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
            <Box display={"flex"} gap={2}>

                {/* Search */}
                <Box>
                    <TextField
                        size="small"
                        placeholder="Search by id, name, email"
                        sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "2px solid #4F4F4F" }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        inputProps={{
                            sx: {
                                "&::placeholder": {
                                    color: "#C2C2C2",
                                    opacity: 1,
                                    fontSize: 14,
                                },
                                color: "white"
                            }
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: "#c2c2c2", fontSize: 22 }} />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Box>

                {/* Filters By Role */}
                <Select
                    size='small'
                    onChange={(e) => setRole(e.target.value as Role)}
                    value={role}
                    sx={{
                        bgcolor: "secondary.dark",
                        border: "2px solid #4F4F4F",
                        color: "#C2C2C2",
                        "& .MuiSelect-icon": { color: "white" }
                    }}>
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"member"}>Member</MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>

                <Select
                    size='small'
                    onChange={(e) => setSortOrder(e.target.value as SortType)}
                    value={sortOrder}
                    sx={{
                        bgcolor: "secondary.dark",
                        border: "2px solid #4F4F4F",
                        color: "#C2C2C2",
                        "& .MuiSelect-icon": { color: "white" }
                    }}>
                    <MenuItem value={"asc"}>old - new</MenuItem>
                    <MenuItem value={"desc"}>new - old</MenuItem>
                </Select>
            </Box>

            {/* Create a User BTN */}
            <Button variant="contained" color="primary" onClick={() => setFormOpen(!formOpen)}>
                Create +
            </Button>
        </Box>
    )
}

export default FilterSortSearch;