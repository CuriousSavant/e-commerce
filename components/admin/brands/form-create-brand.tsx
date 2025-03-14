import { Brand } from '@/types/brand';
import { Dialog, DialogTitle, DialogContent, Box, Stack, TextField, Select, MenuItem, FormControl, InputLabel, Button, FormGroup, FormControlLabel, Switch, Typography } from '@mui/material'
import React, { SetStateAction } from 'react';

interface FormCreateBrand {
    brands: Brand[];
    brandName: string;
    image: string | null;
    dialogOpen: boolean;
    editId: number | null;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    setEditId: React.Dispatch<React.SetStateAction<number | null>>;
    setBrandName: React.Dispatch<React.SetStateAction<string>>;
    setDialogOpen: React.Dispatch<SetStateAction<boolean>>;
    handleCreateBrand: (e: React.FormEvent) => void;
}

const FormCreateBrand: React.FC<FormCreateBrand> = ({
    dialogOpen, setDialogOpen,
    setEditId, brands, handleCreateBrand,
    brandName, editId, setBrandName, image,
    setImage,
}) => {
    const onClose = () => {
        setDialogOpen(!dialogOpen);
        setBrandName("");
        setEditId(null);
    }

    return (
        <Dialog open={dialogOpen} maxWidth={"sm"} fullWidth>
            <Box sx={{ bgcolor: "primary.dark" }}>
                <DialogTitle sx={{ color: "white" }}>{editId ? "แก้ไขหมวดหมู่" : "สร้างหมวดหมู่"}</DialogTitle>
                <DialogContent>
                    <Stack direction={'column'} component={'form'} gap={2} mt={1} onSubmit={handleCreateBrand}>
                        <TextField
                            fullWidth
                            label={"ชื่อหมวดหมู่"}
                            variant="outlined"
                            size="small"
                            value={brandName}
                            type='text'
                            onChange={(e) => setBrandName(e.target.value)}
                            InputLabelProps={{ style: { color: "#C0C0C0" } }}
                            sx={{ bgcolor: "secondary.dark", borderRadius: 2, input: { color: "white" }, border: "1px solid #4a4a5c", }}
                        />
                        {/* Input สำหรับอัปโหลดรูป */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null as any)}
                            style={{ color: "white", marginTop: 10 }}
                        />  
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

export default FormCreateBrand;