import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Category, Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface SearchContextType {
    viewMode: 'grid' | 'list';
    setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
    productsList: Product[];
    setProductsList: React.Dispatch<React.SetStateAction<Product[]>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    query: string | null;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    categories: Category[];
    categoryId: string;
    setCategoryId: React.Dispatch<React.SetStateAction<string>>;
    filterPrice: string;
    setFilterPrice: React.Dispatch<React.SetStateAction<string>>
}

// สร้าง Context และตั้งค่า default เป็น undefined
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// สร้าง Provider Component
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);


    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterPrice, setFilterPrice] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryId, setCategoryId] = useState<string>('all');

    const [loading, setLoading] = useState<boolean>(false)

    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        setLoading(true)
        // ถ้ากำลัง search
        if (query) {
            axios.get(`/api/product?q=${query}&sortBy=all&price=${filterPrice}&categoryId=${categoryId}`)
                .then((res) => setProductsList(res.data.products))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false))
        } else {
            // ถ้าไม่ search
            axios.get(`/api/product?sortBy=all&price=${filterPrice}&categoryId=${categoryId}`)
                .then((res) => setProductsList(res.data.products))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false))

            axios.get('/api/categories').then((res) => setCategories(res.data.categories))
        }
    }, [query, filterPrice, categoryId]);

    return (
        <SearchContext.Provider
            value={{
                viewMode,
                setViewMode,
                productsList,
                setProductsList,
                searchQuery,
                setSearchQuery,
                query,
                loading,
                setLoading,
                categories,
                categoryId,
                setCategoryId,
                filterPrice,
                setFilterPrice
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