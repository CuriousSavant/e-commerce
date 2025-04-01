"use client";
import React, { useEffect, useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import axios from "axios";
import { Box, CircularProgress, IconButton, useMediaQuery } from "@mui/material";
import { MdArrowBackIos } from "react-icons/md";
import { useSession } from "next-auth/react";
import useDialog from "@/context/DialogContext";
import { Wishlist } from "@/types/wishlist";
import RandomProducts from "@/components/client/section/random-product";
import { toast } from 'react-toastify';
import PropertiesTable from "@/components/client/section/properties-table";
import { useCart } from "@/context/CartContext";
import ImageSection from "@/components/client/product-detail/image-section";
import ProductInfo from "@/components/client/product-detail/product-info";
import MobileOrder from "@/components/client/product-detail/mobile-order";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState(0);

  const isMediumScreen = useMediaQuery("(min-width:600px)");

  const router = useRouter();
  const { slug } = useParams();
  const { data: session, status } = useSession();
  const { setIsDialogOpen } = useDialog();
  const [isFavorite, setIsFavorite] = useState(false);
  const { handleAddToCart, handleProductOrder } = useCart();

  // เรียกข้อมูลสินค้าจาก API
  // slug = id ของสินค้า
  useEffect(() => {
    if (!slug) return; // ถ้าไม่มี slug ให้ return ออกไป
    axios
      .get(`/api/product/${slug}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!slug || !session?.user.id) return;

    axios.get(`/api/wishlist?userId=${session?.user?.id}`)
      .then((res) => {
        const isFavorite = res.data.some((item: Wishlist) => item.product.slug === slug);
        setIsFavorite(isFavorite);
        console.log("in", session?.user.id)
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
      });
  }, [slug]);

  const handleAddToWishlist = async (productId: number) => {
    if (status === 'unauthenticated') {
      setIsDialogOpen(true);
      return;
    }

    try {
      const url = isFavorite ? `/api/wishlist/${productId}?userId=${session?.user?.id}` : `/api/wishlist?userId=${session?.user?.id}`;
      const method = isFavorite ? 'DELETE' : 'POST';
      const data = isFavorite ? undefined : { productId, userId: session?.user?.id };

      const response = await axios({ method, url, data });

      if (response.status === (isFavorite ? 200 : 201)) {
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? "นำสินค้าออกจากรายการโปรดแล้ว" : "เพิ่มสินค้าลงในรายการโปรดแล้ว 🎉", {
          autoClose: 1200
        });
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "เกิดข้อผิดพลาด";
      toast.error(errorMessage, {
        autoClose: 1200
      });
    }
  }


  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) notFound();

  // เพิ่มจำนวณสินค้าที่ต้องการสั่งชื้อ
  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  // ลดจำนวณสินค้าที่ต้องการสั่งชื้อ
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // next image
  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % Number(product.image?.length));
  };

  // prev image
  const handlePrev = () => {
    setActiveImage((prev) => (prev - 1 + Number(product.image?.length)) % Number(product.image?.length));
  };

  return (
    <>
      <div className="mt-24 px-4 md:px-8">
        <IconButton onClick={() => router.push('/')} className="mb-4">
          <MdArrowBackIos />
        </IconButton>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* รูปภาพสินค้า */}
          <ImageSection {...{
            activeImage, handleNext, handlePrev,
            product, setActiveImage,
          }} />

          {/* ข้อมูลสินค้า */}
          <ProductInfo {...{
            handleAddToCart, handleAddToWishlist, handleDecrease,
            handleIncrease, isFavorite, isMediumScreen,
            product, quantity, handleProductOrder,
          }} />
        </div>

        {/* แสดงคุณสมบัติสินค้า */}
        <PropertiesTable product={product} />

        {/* menu สั่งชื้อเมื่ออยู่ในขนาดเล้ก */}
        <MobileOrder {...{
          product,
          isMediumScreen,
          quantity,
          handleDecrease,
          handleIncrease,
          handleAddToCart,
          handleAddToWishlist,
          isFavorite,
          handleProductOrder,
        }} />

        <RandomProducts />
      </div>
    </>
  );
};

export default ProductDetailPage;