'use client'
import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Button, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import Link from 'next/link'
import { BsCartX, BsHeart } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

const Wishlist = () => {
  const [favoriteProduct, setFavoriteProduct] = useState<any[]>([])
  const { data: session } = useSession()
  const router = useRouter()

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`/api/wishlist/${productId}`)
      setFavoriteProduct(favoriteProduct.filter(item => item.id !== productId))
      toast.success('ลบสินค้าจากรายการโปรดเรียบร้อยแล้ว')
    } catch (err) {
      toast.error('เกิดข้อผิดพลาดในการลบสินค้า')
      console.error(err)
    }
  }

  const handleAddToCart = async (productId: number, stock: number) => {
    if (stock <= 0) {
      toast.error('สินค้าหมดแล้ว')
      return
    }

    try {
      await axios.post('/api/cart', {
        userId: 1,
        productId,
        quantity: 1,
      })
      toast.success('สินค้าถูกเพิ่มลงในตะกร้าแล้ว!')
    } catch (err) {
      toast.error('เกิดข้อผิดพลาดไม่สามารถเพิ่มสินค้าลงตะกร้าได้')
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`/api/wishlist?userId=${session?.user?.id}`)
        setFavoriteProduct(res.data)
      } catch (err) {
        console.error('ไม่สามารถดึงข้อมูลรายการโปรดได้', err)
      }
    }
    fetchWishlist()
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <IconButton sx={{ mb: 4 }} onClick={() => router.push('/client/profile/overview')}>
        <BiArrowBack />
      </IconButton>
      {/* Header */}
      <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
        <BsHeart size={24} style={{ marginRight: '8px' }} />
        รายการโปรด
      </Typography>

      {/* ไม่มีสินค้า */}
      {favoriteProduct.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
          <BsCartX fontSize="10rem" color="#f1f2f3" />
          <Typography sx={{ mb: 1, fontWeight: 700, fontSize: '20px' }}>ไม่มีสินค้าในรายการโปรด</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ไปช้อปปิ้งกันเถอะ
          </Typography>
        </Box>
      ) : (
        // รายการสินค้า
        <Grid container spacing={2}>
          {favoriteProduct.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.product.id}>
              <Card>
                {/* รูปภาพสินค้า */}
                <CardMedia
                  component="img"
                  image={item.product.image?.[0]}
                  alt={item.product.title}
                  sx={{ objectFit: 'cover,', height: { xs: 300, md: 200 } }}
                />
                {/* ข้อมูลสินค้า */}
                <CardContent sx={{ p: 0, px: 2, py: { xs: 1, md: 0 } }}>
                  <Typography
                    component={Link}
                    href={`/client/${item.product.slug}`}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': { color: '#1976d2' },
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.product.title}
                  </Typography>
                  <Typography color="error" fontWeight="bold">
                    ฿{item.product.price.toLocaleString('th-TH')}
                  </Typography>
                </CardContent>

                {/* การจัดการ */}
                <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    sx={{ px: 4 }}
                    onClick={() => handleAddToCart(item.product.id, item.product.stock)}
                  >
                    เพิ่มลงตะกร้า
                  </Button>
                  <IconButton onClick={() => handleDelete(item.id)} color="error">
                    <MdDelete />
                    </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )
      }
    </Box >
  )
}

export default Wishlist