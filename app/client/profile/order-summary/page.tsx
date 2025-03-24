"use client";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { Order } from "@/types/order";
import axios from "axios";
import { useSession } from "next-auth/react";
import OrderTabs from "@/components/client/orders/order-tabls";
import OrderList from "@/components/client/orders/order-list";
import OrderEmpty from "@/components/client/orders/oder-empty";
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";

const OrderSummary = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();
  const router = useRouter()
  const { handleAddToCart } = useCart()

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/order?userId=${session.user.id}`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [session?.user?.id]);

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

  const filterOrders = (tabIndex: number, orders: Order[]) => {
    const filters = [
      () => true,
      (order: Order) => order.status === "PENDING" as any,
      (order: Order) => order.status === "COMPLETED" as any,
      (order: Order) => order.status === "CANCELED" as any,
    ];
    return orders.filter(filters[tabIndex] || (() => true));
  };

  useEffect(() => {
    setFilteredOrders(filterOrders(tabIndex, orders));
  }, [orders, tabIndex]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
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

      <OrderTabs handleTabChange={handleTabChange} tabIndex={tabIndex} />

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
    </Box>
  );
};

export default OrderSummary;