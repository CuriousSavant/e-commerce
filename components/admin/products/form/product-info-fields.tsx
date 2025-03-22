'use client';
import React, { FormEvent, useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, Typography, Grid, Modal, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';
import { fieldsProps } from './product-form';
import { Category } from '@/types/product';
import { Brand } from '@/types/brand';

interface ProductInfoFielsProps {
    formFields: fieldsProps[];
    loadingImage: boolean;
    productForm: ProductFormStateProps;
    imageUrl: string[];
    selectedImage: string | null;
    slug: string | null;
    categories: Category[];
    brands: Brand[];
    deletedImages: { id: number; url: string }[];
    setDeletedImages: React.Dispatch<React.SetStateAction<{ id: number; url: string }[]>>;
    handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
    handleRemoveImage: (index: number) => void;
    handleUndoDelete: (id: number) => void;
    handleCreateProductAndUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
    setProductForm: React.Dispatch<React.SetStateAction<ProductFormStateProps>>;
}

const ProductInfoFields: React.FC<ProductInfoFielsProps> = ({
    formFields, imageUrl, loadingImage,
    productForm, selectedImage,
    slug, setSelectedImage, handleRemoveImage,
    handleUndoDelete, handleUploadImage,
    handleCreateProductAndUpdate,
    setProductForm, brands, categories,
    deletedImages, setDeletedImages,
}) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(name, value)
        setProductForm({ ...productForm, [name]: name === "price" || name === "stock" ? Number(value) : value });
        setErrors({ ...errors, [name]: '' });
    }

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!productForm.productName) errors.productName = 'ต้องกรอกชื่อสินค้า';
        if (!productForm.productDesc) errors.productDesc = 'ต้องกรอกคำอธิบายสินค้า';
        if (!productForm.price) errors.price = 'ต้องกรอกราคาสินค้า';
        if (!productForm.stock) errors.stock = 'ต้องกรอกจำนวนสินค้าในสต๊อก';

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            handleCreateProductAndUpdate(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {formFields.map((field: fieldsProps, index: number) => (
                    <Grid item xs={12} md={field.fullWidth || field.type === "file" ? 12 : 6} key={index}>
                        {field.type === "file" ? ( // ปุ่มอัพโหลดรูปภาพ
                            <div className='flex items-center flex-wrap gap-2'>
                                <Box mr={2}>
                                    <Typography variant="body1" fontWeight={500} className="mb-2">{field.label}</Typography>
                                    <Button variant="outlined" component="label" sx={{ bgcolor: "secondary.dark" }} className="text-white border border-[#4a4a5c] hover:border-[#6f6f85] w-[200px] h-[60px]">
                                        {loadingImage ? 'Uploading...' : <BiUpload size={20} />}
                                        <input type="file" accept='image/*png,image/jpeg,image/jpg' hidden onChange={handleUploadImage} />
                                    </Button>
                                </Box>
                                {/* แสดงรูปภาพที่เลือก */}
                                {!!imageUrl.length && imageUrl.map((image, index) => (
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
                                    value={productForm[field.name as keyof typeof productForm] || ""}
                                    sx={{ bgcolor: "secondary.dark", color: "white", border: "1px solid #4a4a5c", "& .MuiSelect-icon": { color: "white" } }}>
                                    {field.name === "categoryId" ? (
                                        categories.length > 0 ? (
                                            categories.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>ไม่มีหมวดหมู่</MenuItem>
                                        )
                                    ) : field.name === "brandId" ? (
                                        brands.length > 0 ? (
                                            brands.map((brand) => (
                                                <MenuItem key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>ไม่มีแบรนด์</MenuItem>
                                        )
                                    ) : null}
                                </Select>
                            </FormControl>
                        ) : ( // field กรอกข้อมูล
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
                                error={!!errors[field.name || '']}
                                helperText={errors[field.name || '']}
                                InputLabelProps={{ style: { color: "#C0C0C0" } }}
                                sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "1px solid #4a4a5c", input: { color: "white" }, "& .MuiInputBase-root": { color: "white" } }}
                            />
                        )}
                    </Grid>
                ))}
            </Grid>

            <Button type="submit" variant="contained" sx={{ bgcolor: "primary.main" }} className="mt-10 rounded-lg px-14">
                {slug ? "อัพเดตสินค้า" : "เพิ่มสินค้า"}
            </Button>
            {deletedImages.map((image) => (
                <Snackbar
                    key={image.id}
                    open={true}
                    autoHideDuration={3000}
                    onClose={() => setDeletedImages((prev) => prev.filter((img) => img.id !== image.id))}
                    message="ลบรูปภาพแล้ว"
                    action={
                        <Button
                            color="secondary"
                            size="small"
                            onClick={() => handleUndoDelete(image.id)}
                        >
                            Undo
                        </Button>
                    }
                />
            ))}
        </form>
    )
}

export default ProductInfoFields;