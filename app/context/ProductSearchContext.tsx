import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Category, Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface SearchContextType {
    viewMode: 'grid' | 'list';
    setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
    sortOrder: string;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
    originalProducts: Product[];
    setOriginalProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    query: string | null;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    categories: Category[];
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    filteredProducts: Product[];
}

// สร้าง Context และตั้งค่า default เป็น undefined
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// สร้าง Provider Component
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortOrder, setSortOrder] = useState<string>('createdAt');
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        setLoading(true)
        if (query) {
            axios.get(`/api/product?search=${query}&sortBy=${sortOrder}`)
                .then((res) => setOriginalProducts(res.data))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false))
        } else {
            axios.get(`/api/product?sortBy=${sortOrder}`)
                .then((res) => setOriginalProducts(res.data.products))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false))

            axios.get('/api/categories').then((res) => setCategories(res.data.categories))
        }
    }, [query, sortOrder]);

    useEffect(() => {
        if (!selectedCategory) return;
        setLoading(true)
        axios.get(`/api/product?categoryId=${selectedCategory}&sortBy=${sortOrder}`)
            .then((res) => setFilteredProducts(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }, [originalProducts, selectedCategory])

    return (
        <SearchContext.Provider
            value={{
                viewMode,
                setViewMode,
                sortOrder,
                setSortOrder,
                originalProducts,
                setOriginalProducts,
                searchQuery,
                setSearchQuery,
                query,
                loading,
                setLoading,
                categories,
                selectedCategory,
                setSelectedCategory,
                filteredProducts,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

// Hook สำหรับเรียกใช้งาน Context
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};