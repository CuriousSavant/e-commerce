import React, { SetStateAction, useState } from 'react';
import { Typography, IconButton, Box, Button, Dialog, DialogContent, TextField } from '@mui/material';
import { MdClose } from 'react-icons/md';

import { useSearchContext } from '@/app/context/ProductSearchContext';
import { useRouter } from 'next/navigation';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBox = ({ isSearchOpen, setIsSearchOpen }: { isSearchOpen: boolean, setIsSearchOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    const { searchQuery, setSearchQuery } = useSearchContext()
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery) {
            router.push(`/client/products/search?q=${searchQuery}`);
        } else {
            router.push('/client/products')
        }
        setIsSearchOpen(false)
    };

    return (
        <Dialog
            open={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            fullScreen
            sx={{
                '& .MuiDialog-paper': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <DialogContent sx={{ width: '100%' }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant='subtitle1' sx={{ fontSize: 16, color: "gray" }}>ค้นหาสินค้า</Typography>
                    <IconButton
                        onClick={() => setIsSearchOpen(false)}
                        sx={{ color: 'black' }}
                    >
                        <MdClose size={20} />
                    </IconButton>
                </Box>
                <Box component={'form'} onSubmit={handleSearch} sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: 1, height: "44px" }}>
                    <TextField
                        size="small"
                        placeholder="Searching for..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <HiOutlineSearch style={{ marginLeft: '14px', marginRight: '14px', color: '#757575' }} size={20} />
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: '40px',
                                bgcolor: '#f4f5f7',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                paddingLeft: 0,
                            },
                        }}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        sx={{
                            height: '40px',
                            color: '#fff',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            textTransform: 'none',
                            px: 2,
                            boxShadow: 'none',
                        }}>
                        Search
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default SearchBox;