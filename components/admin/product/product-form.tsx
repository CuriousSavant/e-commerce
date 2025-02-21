'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '@/types/product';
import ProductInfoFields from './form/product-info-fields';

interface SlugProps {
    slug?: string | string[];
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

const ProductForm: React.FC<SlugProps> = ({ slug }) => {
    const [productForm, setProductForm] = useState({
        productName: "",
        productDesc: "",
        price: 0,
        brand: "",
        stock: 0,
        categoryId: null,
    })

    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [loadingImage, setLoadingImage] = useState<boolean>(false);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [deletedImage, setDeletedImage] = useState<string | null>(null);
    const [deletedIndex, setDeletedIndex] = useState<number | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (e: any) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        axios.get('/api/categories').then((res) => setCategories(res.data));
    }, []);

    useEffect(() => {
        if (slug) {
            axios.get(`/api/product/${slug}`).then((res) => {
                const product = res.data;
                setProductForm({
                    productName: product.title,
                    productDesc: product.description,
                    price: product.price,
                    brand: product.brand,
                    stock: product.stock,
                    categoryId: product.categoryId,
                })
            });
        }
    }, [slug]);

    const handleResetState = () => {
        setProductForm({
            productName: "",
            productDesc: "",
            price: 0,
            brand: "",
            stock: 0,
            categoryId: null,
        });
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target?.files?.[0];
        if (!file) return;

        setLoadingImage(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || '');

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
            setImageUrl([...imageUrl, response.data.secure_url]);
        } catch (error) {
            console.error('Image upload error:', error);
        } finally {
            setLoadingImage(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...imageUrl];
        const removedImage = updatedImages.splice(index, 1)[0]; // เก็บรูปที่ถูกลบ
        setImageUrl(updatedImages);
        setDeletedImage(removedImage);
        setDeletedIndex(index);
        setSnackbarOpen(true);
    };

    const handleUndoDelete = () => {
        if (deletedImage !== null && deletedIndex !== null) {
            const updatedImages = [...imageUrl];
            updatedImages.splice(deletedIndex, 0, deletedImage); // คืนรูปกลับที่เดิม
            setImageUrl(updatedImages);
            setDeletedImage(null);
            setDeletedIndex(null);
        }
        setSnackbarOpen(false);
    };

    const handleCreateProductAndUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            title: productForm.productName,
            description: productForm.productDesc,
            image: imageUrl,
            price: productForm.price,
            brand: productForm.brand,
            stock: productForm.stock,
            categoryId: productForm.categoryId,
        };

        try {
            if (slug) {
                // edit product
                await axios.put(`/api/product/${slug}`, productData);
            } else {
                // add product
                await axios.post('/api/product', productData);
            }
            handleResetState();
        } catch (error) {
            console.error(error);
        }
    };

    const properties: any[] = [];
    if (productForm.categoryId) {
        let selCatInfo = categories.find((cat) => cat.id === productForm.categoryId);
        if (selCatInfo) {
            properties.push(...(selCatInfo?.properties || []));
            while (selCatInfo?.parentId) {
                const parentCat = categories.find((cat) => cat.id === selCatInfo?.parentId);
                selCatInfo = parentCat;
            }
        }
    }

    const formFields: fieldsProps[] = [
        { label: 'Product Name', name: "productName", type: "text", fullWidth: true },
        { label: 'Description', name: "productDesc", type: "text", multiline: true, rows: 4, fullWidth: true },
        { label: "Upload Image", type: "file" },
        { label: 'Category', name: "category", type: "select", options: ["Category 1", "Category 2"] },
        { label: 'Price', name: "price", type: "number" },
        { label: 'Brand', name: "brand", type: "select", options: ["Brand A", "Brand B"] },
        { label: 'Stock', name: "stock", type: "number" },
    ];

    return (
        <form className="flex flex-col w-full mx-auto rounded-lg text-white gap-5">
            <ProductInfoFields {...{
                formFields, handleChange, handleRemoveImage, handleUndoDelete, handleUploadImage, imageUrl,
                loadingImage, productForm, selectedImage, setSelectedImage, snackbarOpen, setSnackbarOpen, properties
            }} />
        </form>
    );
};

export default ProductForm;