import { Dialog, DialogTitle, DialogContent, Box, Stack, TextField, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { SetStateAction, useState } from 'react';
import UploadImage from './upload-image';

interface FormCreateBrand {
    brandName: string;
    image: string | null;
    dialogOpen: boolean;
    editId: number | null;
    loading: boolean;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    setEditId: React.Dispatch<React.SetStateAction<number | null>>;
    setBrandName: React.Dispatch<React.SetStateAction<string>>;
    setDialogOpen: React.Dispatch<SetStateAction<boolean>>;
    handleCreateBrand: (e: React.FormEvent) => void;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
}

const FormCreateBrand: React.FC<FormCreateBrand> = ({
    dialogOpen, setDialogOpen,
    setEditId, handleCreateBrand,
    brandName, editId, setBrandName, image,
    setImage, loading, setLoading,
}) => {
    const onClose = () => {
        setDialogOpen(!dialogOpen);
        setBrandName("");
        setEditId(null);
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        if (!["image/jpg", "image/png", "image/jpeg"].includes(file.type)) {
            console.error('Invalid file type');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || '');

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
            setImage(response.data.secure_url);
        } catch (error) {
            console.error('Image upload error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={dialogOpen} maxWidth={"sm"} fullWidth>
            <Box sx={{ bgcolor: "primary.dark" }}>
                <DialogTitle sx={{ color: "white" }}>{editId ? "แก้ไขแบรนด์" : "สร้างแบรนด์"}</DialogTitle>
                <DialogContent>
                    <Stack direction={'column'} component={'form'} gap={2} mt={1} onSubmit={handleCreateBrand}>
                        <TextField
                            fullWidth
                            label={"ชื่อหมวดแบรนด์"}
                            variant="outlined"
                            size="small"
                            value={brandName}
                            type='text'
                            onChange={(e) => setBrandName(e.target.value)}
                            InputLabelProps={{ style: { color: "#C0C0C0" } }}
                            sx={{ bgcolor: "secondary.dark", borderRadius: 2, input: { color: "white" }, border: "1px solid #4a4a5c" }}
                            required
                        />

                        {/* อัปโหลดรูปภาพ */}
                        <UploadImage {...{ handleUploadImage, loading, onClose, image }} />
                    </Stack>
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default FormCreateBrand;