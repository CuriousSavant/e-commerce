"use client";
import React, { useEffect, useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import axios from "axios";
import {
  Box,
  CircularProgress,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { MdAdd, MdArrowBackIos, MdArrowForwardIos, MdShoppingCart } from "react-icons/md";
import { BiHeart, BiMinus } from "react-icons/bi";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import useDialog from "@/hooks/useDialog";
import AuthModal from "@/components/client/section/auth-form";
import { FaHeart } from "react-icons/fa6";
import { Wishlist } from "@prisma/client";
import RandomProducts from "@/components/client/section/random-product";
import { toast } from 'react-toastify';
import PropertiesTable from "@/components/client/section/properties-table";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState(0);

  const router = useRouter()
  const { slug } = useParams();
  const { data: session, status } = useSession()
  const { isDialogOpen, setIsDialogOpen } = useDialog()
  const [isFavorite, setIsFavorite] = useState(false);
  const isMediumScreen = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    axios
      .get(`/api/product/${slug}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [slug]);

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

  // เพิ่มสินค้าลงตะกร้า
  const handleAddToCart = async () => {
    if (status === 'unauthenticated') {
      setIsDialogOpen(true)
      return;
    }

    try {
      if (product) {
        if (product?.stock <= 0) {
          toast.error("สินค้าหมดแล้ว😭", {
            autoClose: 1200
          });
        } else {
          await axios.post("/api/cart", {
            userId: session?.user?.id,
            productId: product?.id,
            quantity: quantity
          })
          toast.success("เพิ่มสินค้าลงตะกร้าแล้ว 🎉", {
            autoClose: 1200
          });
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("เกิดข้อผิดพลาดไม่สามารถเพิ่มสินค้าลงตะกร้าได้", {
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
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // ลดจำนวณสินค้าที่ต้องการสั่งชื้อ
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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
          {/* Section: Product Image */}
          <div className="relative rounded-lg">
            <img
              src={product.image?.[activeImage]}
              alt={product.title}
              className="h-auto md:h-[74vh] w-full object-cover bg-center"
            />

            {product.stock <= 0 && (
              <div className='h-[60vh] absolute inset-0 bg-black bg-opacity-65 flex items-center justify-center z-[999] rounded-lg'>
                <span className="text-white text-lg font-semibold">สินค้าหมด</span>
              </div>
            )}

            {/* ปุ่มลูกศรซ้าย-ขวา */}
            <div className="absolute top-[40%] left-0 right-0 flex justify-between px-4 -translate-y-1/2">
              <IconButton
                color="primary"
                className="bg-white shadow-md"
                onClick={handlePrev}
              >
                <MdArrowBackIos className="text-lg" />
              </IconButton>
              <IconButton
                color="primary"
                className="bg-white shadow-md"
                onClick={handleNext}
              >
                <MdArrowForwardIos className="text-lg" />
              </IconButton>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {product.image?.map((img, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border ${activeImage === index ? 'border-blue-500' : 'border-transparent'
                    } cursor-pointer`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {isDialogOpen && <AuthModal onClose={() => setIsDialogOpen(!isDialogOpen)} />}

          {/* Section: Product Info */}
          <div className="flex flex-col bg-white p-2 md:p-4 rounded-lg">
            <Typography fontWeight={800} fontSize={{ xs: "20px", md: "24px" }} className="mb-2">
              {product.title}
            </Typography>
            <Typography sx={{ mb: 2, color: 'gray' }} variant="subtitle2">{product.description}</Typography>

            {/* แสดงราคา และ ปุ่มสำหรับเพิ่มสินค้าลงรายการโปรด(ในขนาดเล็ก) */}
            {!isMediumScreen && (
              <>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                  <PriceCard price={product.price} />
                  <IconButton
                    onClick={() => handleWishlist(product.id)}
                    className={`${isFavorite ? 'border-red-500 text-red-500' : 'border-gray-400 text-gray-400'}`}
                  >
                    {isFavorite ? <FaHeart /> : <BiHeart />}
                  </IconButton>
                </Box>
              </>
            )}

            {/* รายละเอียดสินค้า */}
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <h1 className="font-bold text-lg mb-2">รายละเอียดสินค้า</h1>
              <p className="text-sm mb-4">
                สินค้าของเราถูกออกแบบมาให้มีคุณภาพสูงสุดเพื่อความพึงพอใจของคุณ
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                {product.feature.map((item, index) => (
                  <li key={index}>{item.desctiption}</li>
                ))}
              </ul>
            </div>

            {/* แสดงราคาสินค้า(ในขนาดใหญ่) */}
            {isMediumScreen && (
              <PriceCard price={product.price} />
            )}

            {/* แสดงเมื่อขนาด 600px ขึ้นไป */}
            {isMediumScreen && (
              <>
                <div className="items-center gap-4">
                  <div className="flex items-center rounded-lg overflow-hidden mb-2">
                    <p className="text-sm">จำนวน:</p>
                    <IconButton
                      size="small"
                      disabled={quantity <= 1}
                      onClick={handleDecrease}
                    >
                      <BiMinus />
                    </IconButton>
                    <Typography
                      variant="body1"
                      textAlign="center"
                      className="w-10 font-bold"
                    >
                      {quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock}
                    >
                      <MdAdd />
                    </IconButton>
                  </div>
                  {quantity === product.stock && (
                    <p className="text-sm text-red-500 font-semibold">สินค้าหมด</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <IconButton
                      onClick={() => handleWishlist(product.id)}
                      className={`${isFavorite ? 'border-red-500 text-red-500' : 'border-gray-400 text-gray-400'}`}
                      size={"large"}
                    >
                      {isFavorite ? <FaHeart /> : <BiHeart />}
                    </IconButton>
                    <Button
                      startIcon={<MdShoppingCart />}
                      className="bg-[#0f63e929] text-blue-500 w-full py-3"
                      onClick={handleAddToCart}
                      size="medium"
                    >
                      เพิ่มลงตะกร้า
                    </Button>
                    {/* <Button
                    variant="contained"
                    startIcon={<MdShoppingCart />}
                    onClick={() => status === 'unauthenticated' ? setIsDialogOpen(true) : handleOrder()}
                    className="bg-[#0f63e9] w-full py-3"
                    size="medium"
                  >
                    สั่งซื้อ
                  </Button> */}
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        {/* แสดงคุณสมบัติสินค้า */}
        <PropertiesTable product={product} />

        {/* menu สั่งชื้อเมื่ออยู่ในขนาดเล้ก */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-[9999]">
          {/* แสดงเมื่อขนาด 600px ลงไป */}
          {!isMediumScreen && (
            <div className="items-center flex justify-between gap-4 p-4 bg-white">

              {/* cols 1 */}
              <div className="flex flex-col">
                <p className="text-sm text-center">จำนวน:</p>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <IconButton
                    size="small"
                    disabled={quantity <= 1}
                    onClick={handleDecrease}
                  >
                    <BiMinus />
                  </IconButton>
                  <Typography
                    variant="body1"
                    textAlign="center"
                    className="w-10 font-bold"
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                  >
                    <MdAdd />
                  </IconButton>
                </div>
                {quantity === product.stock && (
                  <p className="text-sm text-red-500 font-semibold">สินค้าหมด</p>
                )}
              </div>

              {/* cols 2 */}
              <div className="flex justify-end items-center gap-2">
                <Button variant="outlined" onClick={handleAddToCart} className="px-8">ใส่รถเข็น</Button>
                {/* <Button variant="contained" onClick={handleOrder} className="px-8 bg-[#0f63e9]">ซื้อเลย</Button> */}
              </div>
            </div>
          )}
        </div>
        <RandomProducts />
      </div>
    </>
  );
};

export default ProductDetailPage;

const PriceCard = ({ price }: { price: number }) => {
  return (
    <div className="flex items-center gap-2">
      <Typography
        color="primary"
        fontSize={"24px"}
        fontWeight={800}
        className="text-blue-500"
      >
        ฿{price.toLocaleString('th-Th')}
      </Typography>
    </div>
  )
}