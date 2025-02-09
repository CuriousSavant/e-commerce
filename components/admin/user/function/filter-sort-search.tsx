import { Search } from '@mui/icons-material';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputAdornment,
} from '@mui/material';

export default function FilterSortSearch() {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display={"flex"} gap={2}>
                <Box>
                    <TextField
                        size="small"
                        placeholder="Search by name or email"
                        sx={{
                            bgcolor: "secondary.dark",
                            borderRadius: "8px",
                            border: "none",
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Box>

                <Select size='small'>
                    <MenuItem>น้อยไปมาก</MenuItem>
                    <MenuItem>มากไปน้อย</MenuItem>
                </Select>
            </Box>
            <Button variant="contained" color="primary">
                Create +
            </Button>
        </Box>
    )
}