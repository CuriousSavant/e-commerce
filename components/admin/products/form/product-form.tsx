'use client';
import React from 'react';
import ProductInfoFields from './product-info-fields';
import { Box, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Category } from '@/types/product';
import { Brand } from '@/types/brand';

interface ProductFormProps {
    productForm: ProductFormStateProps;
    categories: Category[];
    brands: Brand[];
    slug: string | null;
    imageUrl: string[];
    loadingImage: boolean;
    selectedImage: string | null;
    formOpen: boolean;
    deletedImages: { id: number; url: string }[];
    setDeletedImages: React.Dispatch<React.SetStateAction<{ id: number; url: string }[]>>;
    setProductForm: React.Dispatch<React.SetStateAction<ProductFormStateProps>>;
    handleRemoveImage: (index: number) => void;
    handleUndoDelete: (id: number) => void;
    handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
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
    options?: any[];
}

const ProductForm: React.FC<ProductFormProps> = ({
    productForm, setProductForm, slug,
    handleCreateProductAndUpdate, handleRemoveImage,
    handleUndoDelete, handleUploadImage,
    imageUrl, loadingImage, selectedImage,
    setSelectedImage, formOpen, setFormOpen,
    setSlug, setImageUrl, brands, categories,
    deletedImages, setDeletedImages,
}) => {
    const formFields: fieldsProps[] = [
        { label: 'Product Name', name: "productName", type: "text", fullWidth: true },
        { label: 'Description', name: "productDesc", type: "text", multiline: true, rows: 4, fullWidth: true },
        { label: "Upload Image", type: "file" },
        { label: 'Category', name: "categoryId", type: "select" },
        { label: 'Price', name: "price", type: "text" },
        { label: 'Brand', name: "brandId", type: "select" },
        { label: 'Stock', name: "stock", type: "text" },
    ];

    const BackToProductTable = () => {
        setProductForm({
            productName: "",
            productDesc: "",
            price: 0,
            stock: 0,
            brandId: null,
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
                formFields, handleRemoveImage, handleUndoDelete,
                handleUploadImage, imageUrl, loadingImage,
                productForm, selectedImage, setSelectedImage,
                handleCreateProductAndUpdate,
                setProductForm, slug, categories,
                brands, deletedImages, setDeletedImages
            }} />
        </div>
    );
};

export default ProductForm;