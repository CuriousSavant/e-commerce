'use client'
import { Brand } from "@/types/brand";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const useBrands = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [brandName, setBrandName] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const [query, setQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // const [page, setPage] = useState<number>(0)
    // const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    const fetchBrands = () => {
        setLoading(true);
        axios.get(`/api/brand?q=${query}&sortOrder=${sortOrder}`)
            .then((res) => setBrands(res.data))
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchBrands();
    }, [query, sortOrder]);

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
            .then(() => fetchBrands())
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

    return {
        query, setQuery, setSortOrder,
        sortOrder, dialogOpen, setDialogOpen,
        brands, editId, brandName,
        setEditId, setBrandName, setImage,
        handleCreateBrand, image,
        loading, setLoading,
        handleDeleteBrand, startEditingBrand,
    }
}

export default useBrands;