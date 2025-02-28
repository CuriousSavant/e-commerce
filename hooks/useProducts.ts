import { useState, useEffect } from "react";
import axios from "axios";
import { Category, Product } from "@/types/product";
import { useImageUpload } from "./useImageUpload";
import { debounce } from "lodash";

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

    const { imageUrl } = useImageUpload();

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
        // const delayedFetch = debounce(fetchProducts, 500);
        // delayedFetch(); // delay เพื่อลดการเรียก api ที่ไม่จำเป็น
        // return () => delayedFetch.cancel();
        fetchProducts();
    }, [sortOrder, query, statusFilter, priceFilter])

    // ดึง หมวดหมู่ จาก API
    useEffect(() => {
        fetchCategories();
    }, [categoryFilter]);

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
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

    const startEditing = (product: Product) => {
        setProductForm({
            productName: product.title,
            productDesc: product.description || "",
            price: product.price,
            brand: product.brand,
            stock: product.stock,
            categoryId: product.categoryId,
        });
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
    };
};