import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { ShoppingCart, Person, Inventory, ArrowCircleRight, ContentPaste } from "@mui/icons-material";
import { Order } from "@/types/order";
import { User } from "@/types/user";
import { Product } from "@/types/product";
import axios from "axios";
import { useEffect, useState } from "react";

const Stats = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [products, setProducts,] = useState<Product[]>([])

    useEffect(() => {
        const fetchAll = async () => {
            Promise.all([
                await axios.get('/api/order').then((res) => setOrders(res.data)),
                await axios.get('/api/user/latest-users').then((res) => setUsers(res.data)),
                await axios.get('/api/product/latest-product').then((res) => setProducts(res.data)),
            ])
        }
        fetchAll();
    }, [])

    const stats = [
        {
            icon: <ShoppingCart sx={{ fontSize: 60, color: "#696E77" }} />,
            value: orders.filter(order => order.status === "COMPLETED").length,
            label: "คำสั่งซื้อสำเร็จ",
            href: "/admin/orders"
        },
        {
            icon: <Person sx={{ fontSize: 60, color: "#696E77" }} />,
            value: `${users.length} คน`,
            label: "ยอดการลงทะเบียน", href: "/admin/users"
        },
        {
            icon: <ContentPaste sx={{ fontSize: 60, color: "#696E77" }} />,
            value: `${orders.filter(order => order.status === "PENDING").length} คำสั่งซื้อ`,
            label: "คำสั่งซื้อรอดำเนินการ",
            href: "/admin/orders"
        },
        {
            icon: <Inventory sx={{ fontSize: 60, color: "#696E77" }} />,
            value: `${products.length} ชิ้น`,
            label: "สินค้ามาใหม่",
            href: "/admin/products"
        },
    ];

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {stats.map((stat, index) => (
                <Card key={index} sx={{ backgroundColor: "#27293D", borderRadius: 1 }}>
                    <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                            <Typography variant="h5" sx={{ color: "white", fontWeight: "700" }}>
                                {stat.value}
                            </Typography>
                            <Typography sx={{ color: "#B8B8B8", fontSize: "1rem" }}>{stat.
                                label}</Typography>
                        </Box>
                        <Box sx={{ color: "#B8B8B8", fontSize: 40 }}>{stat.icon}</Box>
                    </CardContent>
                    <Button
                        fullWidth
                        sx={{
                            backgroundColor: "#1E1E2F",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: 0,
                            bgcolor: "#313347",
                            fontSize: "12px"
                        }}
                        href={stat.href}
                    >
                        ดูเพิ่มเติม <ArrowCircleRight fontSize="small" sx={{ ml: 1 }} />
                    </Button>
                </Card>
            ))}
        </Box>
    )
}

export default Stats;