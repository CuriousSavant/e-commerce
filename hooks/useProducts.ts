import { useState, useEffect } from "react";
import axios from "axios";
import { Category, Product } from "@/types/product";
import { useImageUpload } from "./useImageUpload";
import { debounce } from "lodash";
import Swal from 'sweetalert2'

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]); // เก็บสินค้าที่ดึงมาจาก API
    const [categories, setCategories] = useState<Category[]>([]); // รายการหมวดหมู่สินค้า
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // ตัวแปรสำหรับเรียงลำดับข้อมูล
    const [slug, setSlug] = useState<string | null>(null); // slug ของสินค้าที่ต้องการแก้ไข
    const [formOpen, setFormOpen] = useState<boolean>(false); // เปิด form สำหรับเพิ่มสินค้า
    const [selectItem, setSelectItem] = useState<string[]>([]); // รายการสินค้าที่ถูกเลือก

    const [query, setQuery] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priceFilter, setPriceFilter] = useState<string>('all');

    const [loading, setLoading] = useState<boolean>(true);

    const {
        imageUrl, setImageUrl, handleUploadImage,
        loadingImage, selectedImage, setSelectedImage,
        setSnackbarOpen, snackbarOpen, deletedImage,
        deletedIndex, setDeletedImage, setDeletedIndex,
    } = useImageUpload();

    const [productForm, setProductForm] = useState<ProductFormStateProps>({ // state สำหรับ form create user
        productName: "",
        productDesc: "",
        price: 0,
        brand: "",
        stock: 0,
        categoryId: null,
    });

    const fetchProducts = () => {
        setLoading(true)
        axios.get(`/api/product?q=${query}&sortOrder=${sortOrder}&status=${statusFilter}&price=${priceFilter}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    };

    const fetchCategories = () => {
        axios.get('/api/categories')
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err))
    };

    // ดึง สินค้า จาก API
    useEffect(() => {
        const delayedFetch = debounce(fetchProducts, 500);
        delayedFetch(); // delay เพื่อลดการเรียก api ที่ไม่จำเป็น
        return () => delayedFetch.cancel();
    }, [sortOrder, query, statusFilter, priceFilter])

    // ดึง หมวดหมู่ จาก API
    useEffect(() => {
        fetchCategories();
    }, [categoryFilter]);

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const startEditing = (product: Product) => {
        setProductForm({
            productName: product.title,
            productDesc: product.description || "",
            price: product.price,
            brand: product.brand,
            stock: product.stock,
            categoryId: product.categoryId,
        });
        setImageUrl(product.image || []);
        setSlug(product.slug);
        setFormOpen(true);
    };

    const handleResetState = () => {
        setProductForm({
            productName: "",
            productDesc: "",
            price: 0,
            brand: "",
            stock: 0,
            categoryId: null,
        });
        setSlug(null);
        setFormOpen(false);
        fetchProducts();
    };

    const handleCreateProductAndUpdate = async (e: React.FormEvent) => {
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

    const handleDeleteProduct = async (slug: string, productName: string) => {
        try {
            const result = await Swal.fire({
                title: "คุณแน่ใจหรือไม่?",
                text: `คุณต้องการลบสินค้าชิ้นนี้ใช่ไหม: ${productName}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ใช่, ต้องการลบสินค้าชิ้นนี้",
                cancelButtonText: "ยกเลิก",
                confirmButtonColor: "#ed1616",
            });

            if (result.isConfirmed) {
                await axios.delete(`/api/product/${slug}`)
                setProducts((prev) => prev.filter((product) => product.slug !== slug))
                Swal.fire("ลบแล้ว!", "สินค้าชื้นนี้ถูกลบไปแล้ว", "success");
            }
        } catch (err) {
            console.error(err)
            Swal.fire("เกิดข้อผิดพลาด!", "เกิดข้อผิดพลาด ไม่สามารถลบสินค้าชื้นนี้ได้", "error");
        }
    }

    const handleAllDelete = () => {
        Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: `คุณต้องการลบ ${selectItem.length} รายการที่เลือกหรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ใช่, ลบรายการเหล่านี้!",
            cancelButtonText: "ยกเลิก",
            confirmButtonColor: "#ed1616",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/product/`, { data: { slugs: selectItem } }).catch((error) => console.error(error))
                    // วิธีส่งข้อมูลที่ต้องการลบไปหลายตัว เนื่องจาก params รับค่าได้แค่ตัวเดียว
                    .then(() => {
                        setProducts((prev) => prev.filter(p => !selectItem.includes(p.slug)))
                        fetchProducts();
                        setSelectItem([]);
                    }).then(() => {
                        Swal.fire(
                            "Deleted!",
                            `${selectItem.length} items have been deleted.`,
                            "success"
                        );
                    })
                    .catch(() => {
                        Swal.fire(
                            "Error!",
                            "Some items could not be deleted. Please try again.",
                            "error"
                        )
                    });
            }
        });
    }

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

    return {
        products, setProducts,
        categories,
        sortOrder, toggleSortOrder,
        slug, formOpen, setFormOpen,
        productForm, setProductForm,
        fetchProducts, startEditing,
        handleResetState, query, selectItem,
        handleCreateProductAndUpdate, setQuery,
        setSelectItem, categoryFilter, setCategoryFilter,
        statusFilter, setStatusFilter, priceFilter,
        setPriceFilter, setSlug, loading, setLoading,
        handleAllDelete, handleDeleteProduct, imageUrl,
        setImageUrl, handleRemoveImage, handleUndoDelete,
        handleUploadImage, loadingImage, selectedImage, setSelectedImage,
        setSnackbarOpen, snackbarOpen, deletedImage,
    };
};