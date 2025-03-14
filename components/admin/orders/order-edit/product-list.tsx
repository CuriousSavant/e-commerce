import React from "react";
import { Grid, Paper, Typography, Card, CardContent, Button, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OrderItem } from "@/types/order";

interface ProductlistProps {
    updatedItems: OrderItem[];
    openProductListDialog: boolean;
    errorLowProduct: boolean;
    handleRemoveProduct: (slug: string) => void;
    setOpenProductListDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductList: React.FC<ProductlistProps> = ({
    handleRemoveProduct,
    setOpenProductListDialog,
    updatedItems,
    openProductListDialog,
    errorLowProduct,
}) => {
    return (
        <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, backgroundColor: "secondary.dark" }}>
                <Typography variant="h6" sx={{ color: "#ffff" }} gutterBottom>
                    ข้อมูลสินค้า
                    {errorLowProduct && <span className="text-red-500 text-sm ml-2">ต้องมีสินค้าอย่างน้อย 1 ซิ้น</span>}
                </Typography>
                {updatedItems.map((item, index) => (
                    <Card key={index} sx={{ bgcolor: "secondary.dark", color: "white", borderRadius: 2, '.MuiCardContent-root': { py: 1.5, px: 0 } }} elevation={0}>
                        <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            {/* รูปภาพสินค้า */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <IconButton size="small" onClick={() => handleRemoveProduct(item.product.slug)}>
                                    <CloseIcon sx={{ color: "#c3c3c3", width: 18, height: 18 }} />
                                </IconButton>
                                <img
                                    src={item.product.image?.[0] || ""}
                                    alt={item.product.title}
                                    width={50}
                                    height={50}
                                    className='rounded-lg'
                                />
                                <Box>
                                    <Typography sx={{ fontSize: 14, fontWeight: 500 }} className="line-clamp-1">
                                        {item.product.title}
                                    </Typography>
                                    <Typography sx={{ color: "#C3C3C3", fontSize: 13 }}>
                                        จำนวน: {item.quantity} ชิ้น
                                    </Typography>
                                </Box>
                            </Box>
                            {/* ราคาสินค้า */}
                            <Typography variant="h6" sx={{ fontWeight: 700, alignSelf: "start" }}>
                                ฿{item.product.price.toLocaleString('th-TH')}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
                {/* ปุ่ม Add Items */}
                <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "primary.main", color: "white" }} onClick={() => setOpenProductListDialog(!openProductListDialog)}>
                    เพิ่มสินค้า
                </Button>
            </Paper>
        </Grid>
    )
}

export default ProductList