'use client';
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Order } from '@/types/order';
import TabsOrder from '@/components/admin/orders/tabs-order';
import axios from 'axios';
import OrderList from '@/components/admin/orders/order-list';
import OrderDetail from '@/components/admin/orders/order-detail';
import OrderEdit from '@/components/admin/orders/order-edit';
import { Address } from '@/types/address';
import { Product } from '@/types/product';

export type ActiveTabs = 'all' | 'completed' | 'pending' | 'canceled';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [addressList, setAddressList] = useState<Address[]>([])
  const [productList, setProductList] = useState<Product[]>([])

  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  const [activeTabs, setActiveTabs] = useState<ActiveTabs>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [query, setQuery] = useState<string>('');

  const [detailId, setDetailId] = useState<number | null>(null);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [editOrderDetailId, setEditOrderDetailId] = useState<number | null>(null);

  const fetchOrders = () => {
    setLoading(true)
    try {
      axios.get(`/api/order?q=${query}&filterStatus=${activeTabs}&sortOrder=${sortOrder}`)
        .then((res) => { setOrders(res.data), console.log("orders[]:", res.data) });
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAddressList = () => {
    try {
      axios.get('/api/address').then((res) => { setAddressList(res.data) })
    } catch (err) {
      console.error(err)
    }
  }

  const fetchProductList = () => {
    try {
      axios.get('/api/product').then((res) => setProductList(res.data))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchOrders() }, [activeTabs, sortOrder, query]);
  useEffect(() => { Promise.all([fetchAddressList(), fetchProductList()]) }, []);

  const toggleExpand = (orderId: number) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      newSet.has(orderId) ? newSet.delete(orderId) : newSet.add(orderId); // ถ้าค่าที่ส่งมามีอยู่ใน set ให้ ลบ ถ้าไม่ให้ add
      return newSet; // ส่งกลับเข้าที่ state expandedOrders
    });
  };

  const handleChangeTab = (value: ActiveTabs) => {
    setActiveTabs(value);
  }

  const statusColors = {
    "PENDING": "warning",
    "COMPLETED": "success",
    "CANCELED": "error",
  }

  const handleOpenDetail = (orderId: number) => {
    setDetailId(orderId);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setDetailId(null);
  };

  return (
    <Box sx={{ bgcolor: "primary.dark", color: "white", minHeight: "100vh", py: 2, px: 6 }}>
      {editOrderDetailId ?
        <OrderEdit
          order={orders.find(order => order.id === editOrderDetailId)}
          user={orders.find(order => order.id === editOrderDetailId)?.user}
          items={orders.find(order => order.id === editOrderDetailId)?.items}
          address={orders.find(order => order.id === editOrderDetailId)?.address}
          addressList={addressList}
          productList={productList}
          onClose={() => setEditOrderDetailId(null)}
          fetchOrders={fetchOrders}
          fetchAddressList={fetchAddressList}
        /> : (
          <>
            {!openDetail ? (
              <>
                <Typography variant="h5" fontWeight={'bold'} pb={2}>
                  คำสั่งซื้อทั้งหมด
                </Typography>

                {/* Filters */}
                <TabsOrder
                  activeTabs={activeTabs}
                  sortOrder={sortOrder}
                  setActiveTabs={setActiveTabs}
                  handleChangeTab={handleChangeTab}
                  setSortOrder={setSortOrder}
                  query={query}
                  setQuery={setQuery}
                />

                {/* Orders List */}
                {loading ? (
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={340}>
                    <CircularProgress size={'3rem'} />
                  </Box>
                ) : (
                  orders.length > 0 ? (
                    orders.map((order, index) => {
                      const isExpanded = expandedOrders.has(order.id);
                      return (
                        <OrderList
                          key={index}
                          isExpanded={isExpanded}
                          order={order}
                          statusColors={statusColors}
                          toggleExpand={toggleExpand}
                          onOpenDetail={() => handleOpenDetail(order.id)}
                          setEditOrderDetailId={setEditOrderDetailId}
                        />
                      )
                    })) : (
                    <Box height={300} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                      <Typography fontSize={20} fontWeight={700}>ยังไม่มีคำสั่งซื้อ</Typography>
                    </Box>
                  ))}
              </>
            ) : (
              <>
                <OrderDetail order={orders.find(o => o.id === detailId)} onClose={handleCloseDetail} />
              </>
            )}
          </>
        )}
    </Box>
  );
}
