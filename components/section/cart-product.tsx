'use client';
import useDialog from '@/hooks/useDialog';
import { Product } from '@/types/product';
import { Wishlist } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { toast } from 'react-toastify';
import AuthModal from '../auth-form';

const CartProduct = ({ product, viewMode = 'grid' }: { product: Product, viewMode?: 'grid' | 'list' }) => {
    const { isDialogOpen, setIsDialogOpen } = useDialog()
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const { status } = useSession()

    useEffect(() => {
        if (!product?.id) return;

        axios.get(`/api/wishlist`)
            .then((res) => {
                const isFavorite = res.data.some((item: Wishlist) => item.productId === product?.id);
                setIsFavorite(isFavorite);
            })
            .catch((err) => {
                console.error("Error fetching wishlist:", err);
            });
    }, []);

    const handleWishlist = async (productId: number) => {
        if (status === 'unauthenticated') {
            setIsDialogOpen(true);
            return;
        }

        try {
            const url = isFavorite ? `/api/wishlist/${productId}` : `/api/wishlist`;
            const method = isFavorite ? 'DELETE' : 'POST';
            const data = isFavorite ? undefined : { productId };

            const response = await axios({ method, url, data });

            if (response.status === (isFavorite ? 200 : 201)) {
                setIsFavorite(!isFavorite);
                toast.success(isFavorite ? "นำสินค้าออกจากรายการโปรดแล้ว" : "เพิ่มสินค้าลงในรายการโปรดแล้ว 🎉");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || "เกิดข้อผิดพลาด";
            toast.error(errorMessage);
        }
    };

    return (
        <div className={`group h-full flex ${viewMode === 'grid' ? 'flex-col w-full' : 'flex-row w-full'} shadow-md hover:shadow-xl transition duration-75 bg-white rounded-lg overflow-hidden relative`}>
            <Link
                href={`/client/${product.slug}`}
                className={`w-full ${viewMode === 'grid' ? 'flex flex-col items-center' : 'flex flex-row'}`}
            >
                <div className={`flex flex-col overflow-hidden rounded-lg w-full ${viewMode === 'grid' ? 'h-44 lg:h-[12rem]' : 'h-28 lg:h-32 min-w-[130px] max-w-[130px] md:min-w-[150px] md:max-w-[150px]'}`}>
                    <div
                        className="w-full h-full group-hover:scale-110 group-hover:filter group-hover:brightness-70 bg-cover bg-center transition-transform duration-500"
                        style={{ backgroundImage: `url(${product.image?.[0]})` }}
                    />
                    {product.stock === 0 && (
                        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] ${viewMode === 'grid' ? 'h-44 lg:h-[12rem]' : 'h-28 lg:h-32 min-w-[130px] max-w-[130px] md:min-w-[150px] md:max-w-[150px]'}`}>
                            <span className="text-white text-lg font-semibold">สินค้าหมด</span>
                        </div>
                    )}
                </div>

                <div className="py-1 px-2 lg:p-3 min-w-full flex flex-col items-start group-hover:opacity-90 transition duration-300 ease-in-out">
                    <h2 className={`text-xs text-neutral-700 ${viewMode === 'list' ? 'text-3xl' : ''} font-semibold line-clamp-2 text-start`}>
                        {product.title}
                    </h2>
                    <p className="mt-2 md:mt-4 flex-grow font-medium text-blue-500">
                        ฿{product.price.toLocaleString('th-TH')}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">ส่งฟรีทั่วไทย</p>
                    {/* แจ้งเตือนสินค้าใกล์หมด */}
                    {product.stock <= 5 && (
                        <div className={`bg-gray-100 rounded-md pt-[2px] px-2 text-[10px] ${viewMode === 'grid' ? 'w-full' : ''}`}>
                            เหลือสินค้าอีก {product.stock} ชิ้น
                        </div>
                    )}
                </div>
            </Link>

            {/* เปิด form สำหรับ login/register */}
            {isDialogOpen && (
                <AuthModal onClose={() => setIsDialogOpen(!isDialogOpen)} />
            )}

            <button
                onClick={(e) => { e.stopPropagation(), handleWishlist(product.id) }}
                className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white text-black ${viewMode === 'list'
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-[100px] group-hover:opacity-100 group-hover:translate-x-0'
                    } transition-all duration-300 z-[999] ${isFavorite ? 'bg-pink-200 text-pink-500' : ''}`}
            >
                <BiHeart size={20} />
            </button>
        </div>
    );
};

export default CartProduct;