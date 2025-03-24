'use client';
import React, { SetStateAction } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { HiOutlineSearch } from 'react-icons/hi';
import { useSearchContext } from '@/app/context/ProductSearchContext';
import { useRouter } from 'next/navigation';

const SearchBar = ({ setIsSearchOpen }: { setIsSearchOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    const { setSearchQuery, searchQuery } = useSearchContext();
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery) {
            router.push(`/client/products/search?q=${searchQuery}`);
        } else {
            router.push('/client/products')
        }
        setSearchQuery('')
        setIsSearchOpen(false)
    };

    return (
        <Box
            component={'form'}
            onSubmit={handleSearch}
            sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #d4d4d4",
                borderRadius: "8px",
                maxWidth: "400px",
                width: "100%",
                mr: 3,
            }}
        >
            <TextField
                placeholder="Searching for..."
                variant="outlined"
                fullWidth
                size='small'
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{ borderRight: '1px solid #ddd', px: 1 }}>
                            <HiOutlineSearch size={20} className='text-[#6c757d]' />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& .MuiInputBase-input": {
                        fontSize: "16px",
                        padding: 1,
                    },
                }}
            />
        </Box>
    );
};

export default SearchBar;