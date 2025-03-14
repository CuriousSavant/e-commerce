"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Typography } from '@mui/material';
import FormCreateBrand from '@/components/admin/brands/form-create-brand';
import BrandsTable from '@/components/admin/brands/table/brands-table';
import { Brand } from '@/types/brand';
import FilterSortSearchBrand from '@/components/admin/brands/filter-sort-search-brands';

const Brands = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [brandName, setBrandName] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(true)

    const [query, setQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');

    // const [page, setPage] = useState<number>(0)
    // const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    const fetchBrands = () => {
        setLoading(true);
        axios.get(`/api/brand?q=${query}&sortOrder=${sortOrder}&status=${statusFilter}`)
            .then((res) => setBrands(res.data))
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchBrands();
    }, [query, statusFilter, sortOrder]);

    const handleCreateBrand = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name: brandName,
            image: image,
        };

        setLoading(true);
        (editId
            ? axios.put(`/api/brand/${editId}`, payload)
            : axios.post('/api/brand', payload)
        )
            .then(() => {
                fetchBrands();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
                setBrandName("");
                setImage(null);
                setEditId(null);
                setDialogOpen(false);
            });
    };

    const startEditingBrand = (brand: Brand) => {
        setEditId(brand.id);
        setBrandName(brand.name);
        setImage(brand.image || null);
        setDialogOpen(!dialogOpen);
    };

    const handleDeleteBrand = async (brandId: number, brandName: string) => {
        try {
            const result = await Swal.fire({
                title: "คุณแน่ใจหรือไม่?",
                text: `คุณต้องการลบหมวดหมู่ "${brandName}" ใช่หรือไม่`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ใข่, ต้องการลบหมวดหมู่นี้",
                cancelButtonText: "ยกเลิก",
                confirmButtonColor: "#ed1616",
            });

            if (result.isConfirmed) {
                await axios.delete(`/api/brand/${brandId}`);
                setBrands((prev) => prev.filter((brand) => brand.id !== brandId));
                Swal.fire("ลบหมวดหมู่สำเร็จ", `หมวดหมู่ ${brandName} ถูกลบเป็นที่เรียบร้อย`, "success");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบหมวดหมู่ได้ กรุณาลองอีกครั้ง", "error");
        }
    };

    // const handleChangePage = (event: unknown, newPage: number) => {
    //   setPage(newPage)
    // }

    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setRowsPerPage(parseInt(event.target.value, 10))
    //   setPage(0)
    // }

    return (
        <Box py={2} px={6}>
            <Typography variant="h5" mb={2} fontWeight={700}  >
                หมวดหมู่
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
                }}
            />

            <BrandsTable
                brands={brands}
                handleDeleteBrand={handleDeleteBrand}
                startEditingBrand={startEditingBrand}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                // page={page}
                // rowsPerPage={rowsPerPage}
                loading={loading}
            />

            {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categories.length} */}
            {/* rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} */}
            {/* sx={{ bgcolor: 'background.paper' }}
          /> */}
        </Box>
    );
};

export default Brands;
