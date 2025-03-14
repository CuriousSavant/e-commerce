import { Category } from '@/types/product';
import { Dialog, DialogTitle, DialogContent, Box, Stack, TextField, Select, MenuItem, FormControl, InputLabel, Button, FormGroup, FormControlLabel, Switch, Typography } from '@mui/material'
import React, { SetStateAction } from 'react';

interface FormCreateCategoryProps {
    categories: Category[];
    categoryName: string;
    parentId: number | null;
    dialogOpen: boolean;
    editId: number | null;
    status: boolean;
    setEditId: React.Dispatch<React.SetStateAction<number | null>>;
    setCategoryName: React.Dispatch<React.SetStateAction<string>>;
    setDialogOpen: React.Dispatch<SetStateAction<boolean>>;
    setParentId: React.Dispatch<React.SetStateAction<number | null>>;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>

    handleCreateCategory: (e: React.FormEvent) => void;
}

const FormCreateCategory: React.FC<FormCreateCategoryProps> = ({
    dialogOpen, categoryName, setDialogOpen,
    parentId, setCategoryName, setParentId, editId,
    setEditId, categories, setStatus, status,
    handleCreateCategory,
}) => {
    const onClose = () => {
        setDialogOpen(!dialogOpen);
        setCategoryName("");
        setParentId(null);
        setEditId(null);
    }

    return (
        <Dialog open={dialogOpen} maxWidth={"sm"} fullWidth>
            <Box sx={{ bgcolor: "primary.dark" }}>
                <DialogTitle sx={{ color: "white" }}>{editId ? "แก้ไขหมวดหมู่" : "สร้างหมวดหมู่"}</DialogTitle>
                <DialogContent>
                    <Stack direction={'column'} component={'form'} gap={2} mt={1} onSubmit={handleCreateCategory}>
                        <TextField
                            fullWidth
                            label={"ชื่อหมวดหมู่"}
                            variant="outlined"
                            size="small"
                            value={categoryName}
                            type='text'
                            onChange={(e) => setCategoryName(e.target.value)}
                            InputLabelProps={{ style: { color: "#C0C0C0" } }}
                            sx={{ bgcolor: "secondary.dark", borderRadius: 2, input: { color: "white" }, border: "1px solid #4a4a5c", }}
                        />
                        <FormControl fullWidth size="small">
                            <InputLabel sx={{ color: "#C0C0C0" }}>หมวดหมู่ย่อย(ไม่เลือกก็ได้)</InputLabel>
                            <Select
                                variant="outlined"
                                value={parentId ?? ""} // ถ้าเป็น null ให้ใช้ "
                                onChange={(e) => setParentId(Number(e.target.value))}
                                sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4a4a5c", ".MuiSelect-select": { color: "white" }, ".MuiSelect-icon": { color: "white" } }}
                            >
                                {categories.length > 0 ?
                                    categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name ?? "Unknown Category"}
                                        </MenuItem>
                                    )) : (
                                        <MenuItem disabled>ไม่พบหมวดหมู่</MenuItem>
                                    )}
                            </Select>
                        </FormControl>
                        <FormGroup sx={{ mt: 1 }}>
                            <Typography sx={{ fontSize: 12, color: "white" }}>สถานะหมวดหมู่</Typography>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={status}
                                        onChange={(e) => setStatus(e.target.checked)}
                                    />
                                }
                                label={status ? "Active" : "Inactive"}
                                sx={{ color: "white" }}
                            />
                        </FormGroup>
                        <Box display="flex" justifyContent="end" alignItems={"center"} gap={1}>
                            <Button size="small" variant='text' sx={{ color: "white", mt: 2, px: 3 }} onClick={onClose}>ยกเลิก</Button>
                            <Button size="small" type="submit" sx={{ bgcolor: "primary.main", color: "white", mt: 2, px: 3 }}>บันทึก</Button>
                        </Box>
                    </Stack>
                </DialogContent>
            </Box>
        </Dialog>
    )
}

export default FormCreateCategory;