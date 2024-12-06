'use client';
import React, { useState, useEffect } from 'react';
import { BiUpload } from 'react-icons/bi';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { CgClose } from 'react-icons/cg';
import { Categories } from '@/types/product';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, FormGroup, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SlugProps {
    slug?: string;
}

const ProductForm: React.FC<SlugProps> = ({ slug }) => {
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [brand, setBrand] = useState<string>('');
    const [stock, setStock] = useState<number>(0);
    const [goToProduct, setGoToProduct] = useState<boolean>(false);

    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [productProperties, setProductProperties] = useState<{ [key: string]: string }>({});

    const router = useRouter()

    useEffect(() => {
        axios.get('/api/categories').then((res) => setCategories(res.data));
    }, []);

    useEffect(() => {
        if (slug) {
            axios.get(`/api/product/${slug}`).then((res) => {
                const product = res.data;
                setName(product.title);
                setDesc(product.description);
                setImageUrl(product.image || []);
                setPrice(product.price);
                setBrand(product.brand);
                setStock(product.stock);
                setCategoryId(product.categoryId);
                setProductProperties(product.productProperty || {});
            });
        }
    }, [slug]);

    const handleResetState = () => {
        setName('');
        setDesc('');
        setImageUrl([]);
        setPrice(0);
        setBrand('');
        setStock(10);
    };

    const handleuploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target?.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || '');

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
            setImageUrl([...imageUrl, response.data.secure_url]);
        } catch (error) {
            console.error('Image upload error:', error);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...imageUrl];
        updatedImages.splice(index, 1);
        setImageUrl(updatedImages);
    };

    const handleCreateProductAndUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            title: name,
            description: desc,
            image: imageUrl,
            price: price,
            brand: brand,
            stock: stock,
            categoryId: categoryId,
            productProperties: productProperties,
        };

        try {
            if (slug) {
                // edit product
                await axios.put(`/api/product/${slug}`, productData);
            } else {
                // add product
                await axios.post('/api/product', productData);
            }
            setGoToProduct(true);
            handleResetState();
        } catch (error) {
            console.error(error);
        }
    };

    if (goToProduct) {
        return redirect('/arc/admin/products');
    }

    const properties: any[] = [];
    if (categoryId) {
        let selCatInfo = categories.find((cat) => cat.id === categoryId);
        if (selCatInfo) {
            properties.push(...(selCatInfo?.properties || []));
            while (selCatInfo?.parentId) {
                const parentCat = categories.find((cat) => cat.id === selCatInfo?.parentId);
                selCatInfo = parentCat;
            }
        }
    }

    return (
        <form className="flex flex-col w-full border border-[#ddd] px-6 py-4 rounded-lg gap-3.5" onSubmit={handleCreateProductAndUpload}>
            <div>
                <Typography variant='subtitle1' fontWeight={600}>Basic information</Typography>
            </div>
            {/* product name */}
            <FormGroup>
                <TextField
                    label="Product Name"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    size='small'
                    autoFocus
                    required
                />
            </FormGroup>

            {/* select category */}
            <FormGroup>
                <FormControl fullWidth size='small'>
                    <InputLabel>Category</InputLabel>
                    <Select
                        onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            setCategoryId(selectedId);
                        }}
                        value={categoryId || ''}
                        label="Category"
                    >
                        <MenuItem value="">UnCategorized</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormGroup>

            {/* select properties */}
            {properties.length > 0 && properties.map((cateItem, index) => {
                return (
                    <FormGroup key={index} className="mb-3">
                        <Typography variant="body1" sx={{ mb: 1 }}>{cateItem.name}</Typography>
                        <TextField
                            key={cateItem.value}
                            value={cateItem.value}
                            size='small'
                            label='properties value'
                        >
                            {cateItem.value}
                        </TextField>
                    </FormGroup>
                );
            })}

            {/* select image */}
            <FormGroup>
                <div className="flex flex-wrap gap-2 w-full">
                    <Button
                        variant="outlined"
                        component="label"
                        color="primary"
                        sx={{
                            p: { xs: 1, md: 3 },
                            border: "1px solid #ddd",
                            color: "black",
                        }}
                        startIcon={<BiUpload />}

                    >
                        Upload Image
                        <input
                            id="input-file"
                            type="file"
                            className="hidden"
                            onChange={handleuploadImage}
                        />
                    </Button>
                    {!!imageUrl.length &&
                        imageUrl.map((image, index) => {
                            return (
                                <div key={index} className="relative">
                                    <img src={image} className="h-20 rounded-md" alt="uploaded product" />
                                    <button
                                        className="absolute top-0 right-0 text-red-500 p-0.5"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <CgClose />
                                    </button>
                                </div>
                            )
                        })}
                </div>
            </FormGroup>

            {/* description */}
            <FormGroup>
                <TextField
                    label="Description"
                    variant="outlined"
                    size='small'
                    multiline
                    rows={4}
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    required
                />
            </FormGroup>

            {/* price product */}
            <FormGroup>
                <TextField
                    label="Price"
                    variant="outlined"
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                    size='small'
                    value={price}
                    required
                />
            </FormGroup>

            {/* brand */}
            <FormGroup>
                <TextField
                    label="Brand"
                    variant="outlined"
                    onChange={(e) => setBrand(e.target.value)}
                    size='small'
                    value={brand}
                />
            </FormGroup>

            {/* stock */}
            <FormGroup>
                <TextField
                    label="Stock"
                    variant="outlined"
                    type="number"
                    onChange={(e) => setStock(Number(e.target.value))}
                    size='small'
                    value={stock}
                    required
                />
            </FormGroup>
            {/* Actions */}
            <Box className="flex gap-2">
                <Button type="submit" variant="contained" color="primary" className="py-2">
                    Save Product
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => router.push("/arc/admin/products")}
                >
                    Cancel
                </Button>
            </Box>
        </form>
    );
};

export default ProductForm;