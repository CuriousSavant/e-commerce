'use client'
import React from 'react';
import { Box, Typography } from '@mui/material';
import FormCreateBrand from '@/components/admin/brands/form-create-brand';
import BrandsTable from '@/components/admin/brands/table/brands-table';
import FilterSortSearchBrand from '@/components/admin/brands/filter-sort-search-brands';
import useBrands from '@/hooks/useBrands';

const Brands = () => {
    const {
        brandName, setBrandName, brands,
        dialogOpen, setDialogOpen, editId,
        handleCreateBrand, image, setImage,
        loading, query, setQuery, setEditId,
        setLoading, setSortOrder, sortOrder,
        handleDeleteBrand,startEditingBrand,
    } = useBrands();

    return (
        <Box py={2} px={{ xs: 2, md: 6 }}>
            <Typography variant="h5" fontWeight={700} mb={{ xs: 4, md: 2 }}>
                แบรนด์
            </Typography>

            <FilterSortSearchBrand {...{
                query, setQuery, setSortOrder,
                sortOrder, dialogOpen, setDialogOpen
            }} />

            <FormCreateBrand
                {...{
                    brands, dialogOpen, editId,
                    brandName, setDialogOpen,
                    setEditId, setBrandName, setImage,
                    handleCreateBrand, image,
                    loading, setLoading,
                }}
            />

            <BrandsTable
                brands={brands}
                handleDeleteBrand={handleDeleteBrand}
                startEditingBrand={startEditingBrand}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                loading={loading}
            />
        </Box>
    );
};

export default Brands;
