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

const CartProduct = ({ product }: { product: Product }) => {
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
        <button className="group flex flex-col shadow-md hover:shadow-xl transition duration-75 bg-white rounded-lg overflow-hidden relative">
            <Link
                href={`/client/${product.slug}`}
                className='w-full'
            >
                <div className="w-full h-36 lg:h-52 overflow-hidden rounded-lg">
                    <div
                        className="w-full h-full group-hover:scale-110 group-hover:filter group-hover:brightness-90 bg-cover bg-center transition-transform duration-500"
                        style={{ backgroundImage: `url(${product.image?.[0]})` }}
                    />
                </div>

                <div className="py-2 px-3 lg:p-4 flex flex-col items-start group-hover:opacity-90 transition duration-300 ease-in-out">
                    <h2 className="text-sm font-semibold group-hover:text-blue-500 line-clamp-2 text-start">
                        {product.title}
                    </h2>
                    <p className="text-neutral-800 mt-2 md:mt-4 flex-grow font-medium">
                        ฿{product.price.toLocaleString('th-TH')}
                        <span className="text-gray-400 line-through text-sm ml-2">฿120</span>
                    </p>
                    <p className="text-xs text-gray-400 mb-2">ส่งฟรีทั่วไทย</p>
                    {/* แจ้งเตือนสินค้าใกล์หมด */}
                    {product.stock <= 5 && (
                        <div className='bg-gray-100 rounded-md pt-[2px] text-[10px] w-full'>
                            เหลือสินค้าอีก 2 ชิ้น
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
                className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white text-black opacity-0 translate-x-[100px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-[999] ${isFavorite ? 'bg-pink-200 text-pink-500' : ''}`}
            >
                <BiHeart size={20} />
            </button>
        </button>
    );
};

export default CartProduct;