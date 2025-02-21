'use client';
import React from 'react';
import { BiUpload } from 'react-icons/bi';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, Typography, Grid, Modal, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';
import { fieldsProps } from '../product-form';

interface ProductInfoFielsProps {
    formFields: fieldsProps[];
    loadingImage: boolean;
    handleUploadImage: (e: any) => void;
    imageUrl: string[];
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
    handleRemoveImage: (index: number) => void;
    selectedImage: string | null;
    handleUndoDelete: () => void;
    snackbarOpen: boolean;
    handleChange: (e: any) => void;
    productForm: { productName: string, productDesc: string, price: number, brand: string, stock: number, categoryId: number | null };
    setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductInfoFields: React.FC<ProductInfoFielsProps> = ({
    formFields,
    handleChange,
    handleRemoveImage,
    handleUndoDelete,
    handleUploadImage,
    imageUrl,
    loadingImage,
    productForm,
    selectedImage,
    setSelectedImage,
    snackbarOpen,
    setSnackbarOpen,
}) => {
    return (
        <>
            <Grid container spacing={2}>
                {formFields.map((field: any, index: number) => (
                    <Grid item xs={12} md={field.fullWidth || field.type === "file" ? 12 : 6} key={index}>
                        {field.type === "file" ? ( // ปุ่มอัพโหลดรูปภาพ
                            <div className='flex items-center flex-wrap gap-2'>
                                <Box mr={2}>
                                    <Typography variant="body1" fontWeight={500} className="mb-2">{field.lable}</Typography>
                                    <Button variant="outlined" component="label" sx={{ bgcolor: "secondary.dark" }} className="text-white border border-[#4a4a5c] hover:border-[#6f6f85] w-[200px] h-[60px]">
                                        {loadingImage ? 'Uploading...' : <BiUpload size={20} />}
                                        <input type="file" hidden onChange={handleUploadImage} />
                                    </Button>
                                </Box>
                                {/* แสดงรูปภาพที่เลือก */}
                                {!!imageUrl.length &&
                                    imageUrl.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img src={image} onClick={() => setSelectedImage(image)} className="h-24 rounded-md cursor-pointer" alt="uploaded product" />
                                            <button
                                                type='button'
                                                className="absolute top-0 right-0 text-red-500"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <Close />
                                            </button>
                                        </div>
                                    ))}
                                {/* เมื่อกดรูปภาพจะแสดงภาพเต็ม */}
                                <Modal open={!!selectedImage} className='relative'>
                                    <div className="flex items-center justify-center h-screen bg-black bg-opacity-75">
                                        <IconButton onClick={() => setSelectedImage(null)} className="absolute top-2 right-6 md:right-10 text-white">
                                            <Close />
                                        </IconButton>
                                        <img src={selectedImage!} className="max-w-[80%] max-h-[80%] rounded-lg" alt="Full size preview" />
                                    </div>
                                </Modal>
                            </div>
                        ) : field.type === "select" ? ( // ปุ่มเลือกหมวดหมู่
                            <FormControl fullWidth size="small">
                                <InputLabel sx={{ color: "#C0C0C0" }}>{field.label}</InputLabel>
                                <Select
                                    name={field.name}
                                    onChange={handleChange}
                                    value={productForm[field.name as keyof typeof productForm]}
                                    sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4a4a5c" }}>
                                    {field.options?.map((option: any, idx: number) => (
                                        <MenuItem key={idx} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : ( // field กรอกข้อมูล
                            <>
                                <TextField
                                    label={field.label}
                                    variant="outlined"
                                    name={field.name}
                                    type={field.type}
                                    onChange={handleChange}
                                    value={productForm[field.name as keyof typeof productForm]}
                                    size="small"
                                    fullWidth
                                    multiline={field.multiline || false}
                                    rows={field.rows || 1}
                                    InputLabelProps={{ style: { color: "#C0C0C0" } }}
                                    sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "1px solid #4a4a5c", input: { color: "white" }, "& .MuiInputBase-root": { color: "white" } }}
                                    required
                                />
                            </>
                        )}
                    </Grid>
                ))}
            </Grid>

            <Button type="submit" variant="contained" sx={{ bgcolor: "primary.main" }} fullWidth className="py-2 rounded-lg">
                Add Product
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="ลบรูปภาพแล้ว"
                action={
                    <Button color="secondary" size="small" onClick={handleUndoDelete}>
                        Undo
                    </Button>
                }
            />
        </>
    )
}

export default ProductInfoFields;