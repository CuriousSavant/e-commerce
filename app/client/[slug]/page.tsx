"use client";
import React, { useEffect, useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import axios from "axios";
import { toast } from 'react-toastify'
import {
  Box,
  CircularProgress,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { MdAdd, MdArrowBackIos, MdArrowForwardIos, MdShoppingCart } from "react-icons/md";
import { BiHeart, BiMinus } from "react-icons/bi";
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper } from "@mui/material";
import useCart from "@/hooks/useCart";
import { useSession } from "next-auth/react";
import useDialog from "@/hooks/useDialog";
import AuthModal from "@/components/auth-form";
import { FaHeart } from "react-icons/fa6";
import { Wishlist } from "@prisma/client";
// เมื่อกด ใส่ตะกร้าแล้วให้ขึ้น popup เหมือน mercular

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState(0);

  const { handleOrder } = useCart()
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
  }, [product?.id]);

  const handleWishlist = async (productId: number) => {
    if (status === 'unauthenticated') {
      setIsDialogOpen(true);
      return;
    }

    try {
      const url = isFavorite ? `/api/wishlist/${productId}` : `/api/wishlist`;
      const method = isFavorite ? 'DELETE' : 'POST';
      const data = isFavorite ? undefined : { productId };

      console.log(isFavorite, url, method, data)

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

  // เพิ่มสินค้าลงตะกร้า
  const handleAddToCart = async () => {
    if (status === 'unauthenticated') {
      setIsDialogOpen(true)
      return;
    }

    try {
      if (product) {
        if (product?.stock <= 0) {
          toast.error('สินค้าหมดแล้ว')
        } else {
          await axios.post("/api/cart", {
            userId: session?.user?.id,
            productId: product?.id,
            quantity: quantity
          })
          toast.success('สินค้าถูกเพิ่มลงในตะกร้าแล้ว!', {
            position: "top-right",
            autoClose: 1500,
            closeButton: true,
          });
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาดไม่สามารถเพิ่มสินค้าลงตระกร้าได้', {
        position: "top-right",
        autoClose: 1500,
        closeButton: true,
      })
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

  // เพิ่มนำนวณสินค้าที่ต้องการสั่งชื้อ
  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // ลดนำนวณสินค้าที่ต้องการสั่งชื้อ
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
            className="h-[60vh] md:h-[80vh] w-full object-cover bg-center"
          />

          {/* ปุ่มลูกศรซ้าย-ขวา */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
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
          <Typography fontWeight={800} fontSize={"24px"} className="mb-2">
            {product.title}
          </Typography>
          <p className="mb-4 text-gray-600">{product.description}</p>

          {!isMediumScreen && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Typography
                  color="primary"
                  fontSize={"24px"}
                  fontWeight={800}
                  className="text-blue-500"
                >
                  ฿{product.price.toLocaleString('th-Th')}
                </Typography>
                <span className="text-sm text-gray-400 line-through">฿18,000</span>
              </div>
            </div>
          )}

          {/* รายละเอียดสินค้า */}
          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <h1 className="font-bold text-lg mb-2">รายละเอียดสินค้า</h1>
            <p className="text-sm mb-4">
              สินค้าของเราถูกออกแบบมาให้มีคุณภาพสูงสุดเพื่อความพึงพอใจของคุณ
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>ออกแบบด้วยวัสดุคุณภาพ</li>
              <li>ใช้งานง่าย เหมาะสำหรับทุกคน</li>
              <li>รับประกันสินค้า 1 ปี</li>
            </ul>
          </div>

          {isMediumScreen && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Typography
                  color="primary"
                  fontSize={"24px"}
                  fontWeight={800}
                  className="text-blue-500"
                >
                  ฿{product.price.toLocaleString('th-Th')}
                </Typography>
                <span className="text-sm text-gray-400 line-through">฿18,000</span>
              </div>
            </div>
          )}

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
                    size={"medium"}
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
                  <Button
                    variant="contained"
                    startIcon={<MdShoppingCart />}
                    onClick={() => status === 'unauthenticated' ? setIsDialogOpen(true) : handleOrder()}
                    className="bg-[#0f63e9] w-full py-3"
                    size="medium"
                  >
                    สั่งซื้อ
                  </Button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {/* คุณสมบัติสินค้า */}
      <div className="mt-8">
        <Typography fontWeight={800} fontSize="20px" className="mb-4">
          คุณสมบัติสินค้า
        </Typography>
        <Paper elevation={0} className="rounded-lg">
          <TableContainer>
            <Table>
              <TableBody>
                {product.category.properties.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : ''}
                  >
                    <TableCell sx={{ padding: "10px" }}>{item.name}</TableCell>
                    <TableCell sx={{ padding: "10px" }}>{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
        {!isMediumScreen && (
          <div className="items-center flex justify-between gap-4 px-2 p-3">
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
            <div className="flex justify-end items-center gap-2">
              <Button variant="outlined" onClick={handleAddToCart}>ใส่รถเข็น</Button>
              <Button variant="contained" onClick={handleOrder}>ซื้อเลย</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;