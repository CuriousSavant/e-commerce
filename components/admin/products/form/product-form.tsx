'use client';
import React from 'react';
import ProductInfoFields from './product-info-fields';
import { Box, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface ProductFormProps {
    productForm: ProductFormStateProps;
    slug: string | null;
    imageUrl: string[];
    loadingImage: boolean;
    selectedImage: string | null;
    snackbarOpen: boolean;
    formOpen: boolean;
    setProductForm: React.Dispatch<React.SetStateAction<ProductFormStateProps>>;
    handleRemoveImage: (index: number) => void;
    handleUndoDelete: () => void;
    handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
    setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleCreateProductAndUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSlug: React.Dispatch<React.SetStateAction<string | null>>
    setImageUrl: React.Dispatch<React.SetStateAction<string[]>>
}

export type fieldsProps = {
    label: string;
    name?: string;
    type: string;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    options?: string[];
}

const ProductForm: React.FC<ProductFormProps> = ({
    productForm, setProductForm, slug,
    handleCreateProductAndUpdate, handleRemoveImage,
    handleUndoDelete, handleUploadImage,
    imageUrl, loadingImage, selectedImage,
    setSelectedImage, snackbarOpen, setSnackbarOpen,
    formOpen, setFormOpen, setSlug, setImageUrl,
}) => {
    const formFields: fieldsProps[] = [
        { label: 'Product Name', name: "productName", type: "text", fullWidth: true },
        { label: 'Description', name: "productDesc", type: "text", multiline: true, rows: 4, fullWidth: true },
        { label: "Upload Image", type: "file" },
        { label: 'Category', name: "category", type: "select", options: [] },
        { label: 'Price', name: "price", type: "text" },
        { label: 'Brand', name: "brand", type: "select", options: [] },
        { label: 'Stock', name: "stock", type: "text" },
    ];

    const BackToProductTable = () => {
        setProductForm({
            productName: "",
            productDesc: "",
            price: 0,
            brand: "",
            stock: 0,
            categoryId: null,
        });
        setImageUrl([]);
        setFormOpen(!formOpen);
        setSlug(null);
    }

    return (
        <div className="flex flex-col w-full mx-auto rounded-lg text-white gap-5">
            <Box>
                <IconButton onClick={() => BackToProductTable()}>
                    <ArrowBack sx={{ color: "white" }} />
                </IconButton>
            </Box>
            <ProductInfoFields {...{
                formFields,
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
                handleCreateProductAndUpdate,
                setProductForm,
                slug,
            }} />
        </div>
    );
};

export default ProductForm;