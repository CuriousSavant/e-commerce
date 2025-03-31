"use client";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, TablePagination } from "@mui/material";
import { Order } from "@/types/order";
import axios from "axios";
import { useSession } from "next-auth/react";
import OrderTabs from "@/components/client/orders/order-tabls";
import OrderList from "@/components/client/orders/order-list";
import OrderEmpty from "@/components/client/orders/oder-empty";
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const OrderSummary = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tabStatus, setTabStatus] = useState<'all' | 'PENDING' | 'COMPLETED' | 'CANCELED'>('all');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [countOrders, setCountOrders] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: session } = useSession();
  const router = useRouter()
  const { handleAddToCart } = useCart()

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/order?userId=${session.user.id}&sortOrder=desc&page=${page}&pageSize=${pageSize}&filterStatus=${tabStatus}`);
        setOrders(res.data.orders);
        setCountOrders(res.data.ordersCount);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [session?.user?.id, page, pageSize, tabStatus]);

  const formatStatus = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      // สำหรับใช้งานจริง
      // PENDING: { label: "กำลังจัดเตรียม", color: "warning" },
      // DELIVERING: { label: "กำลังจัดส่ง", color: "warning" }, ควรเพิ่มสถานะนี้เพิ่มเติม
      // COMPLETED: { label: "จัดส่งเสร็จ", color: "success" },
      // CANCELED: { label: "ยกเลิกสินค้าแล้ว", color: "error" },

      // ใช้งานเล่นๆ ปลอบใจคนโสด
      PENDING: { label: "เป็นได้แค่พี่น้อง", color: "warning" },
      COMPLETED: { label: "เขาไปมีคนใหม่แล้ว", color: "success" },
      CANCELED: { label: "ได้แค่คุย", color: "error" },
    };
    return statusMap[status] || { label: "ไม่ทราบสถานะ", color: "default" };
  };

  const filterOrders = (status: string, orders: Order[]) => {
    const filters = {
      all: () => true,
      PENDING: (order: Order) => order.status === "PENDING",
      COMPLETED: (order: Order) => order.status === "COMPLETED",
      CANCELED: (order: Order) => order.status === "CANCELED",
    };
    return orders.filter(filters[status as keyof typeof filters] || (() => true));
  };

  useEffect(() => {
    setFilteredOrders(filterOrders(tabStatus, orders));
  }, [orders, tabStatus]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: 'all' | 'PENDING' | 'COMPLETED' | 'CANCELED') => {
    setTabStatus(newValue);
  setPage(1);
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      const result = await Swal.fire({
        title: `คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่ไหม`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      });

      if (result.isConfirmed) {
        setLoading(true);
        await axios.put(`/api/order/${orderId}/cancel`);
        Swal.fire({
          icon: "success",
          title: "ทำการยกเลิกคำสั่งซื้อแล้ว",
        });
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "เกิดข้อผิดพลาด ไม่สามารถยกเลิกสินค้านี้ได้",
        icon: "error",
        text: "กรุณาติดต่อผู้ดูแลหากต้องการยกเลิกสินค้านี้",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fff", overflowX: "auto", px: 3, maxWidth: "100%" }}>
      <IconButton sx={{ mb: 2 }} onClick={() => router.push('/client/profile/overview')}>
        <BiArrowBack />
      </IconButton>

      <OrderTabs handleTabChange={handleTabChange} tabIndex={tabStatus} />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress />
        </Box>
      ) : filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderList
            key={order.id}
            formatStatus={formatStatus}
            order={order}
            handleCancelOrder={handleCancelOrder}
            handleAddToCart={handleAddToCart}
          />
        ))
      ) : (
        <OrderEmpty />
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={countOrders}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={(_, newPage) => setPage(newPage + 1)}
        onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPageSize(Number(e.target.value)), setPage(1) }}
        nextIconButtonProps={{ disabled: (page * pageSize) >= countOrders }}
        backIconButtonProps={{ disabled: page <= 1 }}
        sx={{ overflowX: "hidden" }}
      />
    </Box>
  );
};

export default OrderSummary;