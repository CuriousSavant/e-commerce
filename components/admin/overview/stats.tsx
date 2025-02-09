import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { ShoppingCart, Person, Inventory, ArrowCircleRight, LocalShipping, ContentPaste } from "@mui/icons-material";

const stats = [
    { icon: <ShoppingCart sx={{ fontSize: 60, color: "#696E77" }} />, value: "150", label: "จำนวนคำสั่งซื้อใหม่", href: "/admin/orders" },
    { icon: <Person sx={{ fontSize: 60, color: "#696E77" }} />, value: "5 คน", label: "ยอดการลงทะเบียน", href: "/admin/users" },
    { icon: <ContentPaste sx={{ fontSize: 60, color: "#696E77" }} />, value: "18", label: "คำสั่งซื้อรอดำเนินการ", href: "/admin/orders" },
    { icon: <Inventory sx={{ fontSize: 60, color: "#696E77" }} />, value: "3", label: "สินค้ามาใหม่", href: "/admin/products" },
];

export default function Stats() {
    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {stats.map((stat, index) => (
                <Card key={index} sx={{ backgroundColor: "#27293D", borderRadius: 1 }}>
                    <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box>
                            <Typography variant="h5" sx={{ color: "white", fontWeight: "700" }}>
                                {stat.value}
                            </Typography>
                            <Typography sx={{ color: "#B8B8B8", fontSize: "1rem" }}>{stat.label}</Typography>
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