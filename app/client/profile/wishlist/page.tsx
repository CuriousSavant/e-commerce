'use client'
import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Button, Grid, Card, CardMedia, CardContent, CardActions, CircularProgress } from '@mui/material'
import { BsCartX, BsHeart } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { Wishlist } from '@/types/wishlist'

const WishlistPage = () => {
  const [favoriteProduct, setFavoriteProduct] = useState<Wishlist[]>([])
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`/api/wishlist/${productId}`)
      setFavoriteProduct(favoriteProduct.filter(item => item.product.id !== productId))
      toast.success('ลบสินค้าจากรายการโปรดเรียบร้อยแล้ว', {
        autoClose: 1200
      })
    } catch (err) {
      toast.error('เกิดข้อผิดพลาดในการลบสินค้า', {
        autoClose: 1200
      })
      console.error(err)
    }
  }

  const handleAddToCart = async (productId: number, stock: number) => {
    if (stock <= 0) {
      toast.error('สินค้าหมดแล้ว', {
        autoClose: 1200
      })
      return
    }

    try {
      await axios.post('/api/cart', {
        userId: session?.user.id,
        productId,
        quantity: 1,
      })
      toast.success('สินค้าถูกเพิ่มลงในตะกร้าแล้ว!', {
        autoClose: 1200
      })
    } catch (err) {
      toast.error('เกิดข้อผิดพลาดไม่สามารถเพิ่มสินค้าลงตะกร้าได้', {
        autoClose: 1200
      })
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/wishlist?userId=${session?.user?.id}`)
        setFavoriteProduct(res.data)
      } catch (err) {
        console.error('ไม่สามารถดึงข้อมูลรายการโปรดได้', err)
      } finally {
        setLoading(false)
      }
    }
    fetchWishlist()
  }, [session?.user?.id])

  return (
    <Box sx={{ p: 3 }}>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
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
              <Typography sx={{ mb: 1, fontWeight: 700, fontSize: '20px', color: "gray" }}>ไม่มีสินค้าในรายการโปรด</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                ไปช้อปปิ้งกันเถอะ
              </Typography>
            </Box>
          ) : (
            // รายการสินค้า
            <Grid container spacing={2}>
              {favoriteProduct.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.product.id}>
                  <Card sx={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {/* รูปภาพสินค้า */}
                    <CardMedia
                      component="div"
                      sx={{
                        height: 0,
                        paddingTop: '90%', // 16:9
                        backgroundImage: `url(${item.product.image?.[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}
                    >
                      {item.product.stock === 0 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        >
                          สินค้าหมด
                        </Box>
                      )}
                    </CardMedia>
                    <CardContent>
                      <Typography
                        component="h2"
                        variant="h6"
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
                      <Typography fontWeight="bold" color='primary'>
                        ฿{item.product.price.toLocaleString('th-TH')}
                      </Typography>
                    </CardContent>
                    {/* การจัดการ */}
                    <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 'auto' }}>
                      <Button
                        variant="outlined"
                        sx={{ px: 4 }}
                        onClick={() => handleAddToCart(item.product.id, item.product.stock)}
                      >
                        เพิ่มลงตะกร้า
                      </Button>
                      <IconButton onClick={() => handleDelete(item.product.id)} color="error">
                        <MdDelete />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  )
}

export default WishlistPage