import { Order } from "@/types/order";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { format } from "date-fns";
import React from "react";

const ProductSide = ({ order }: { order?: Order }) => {
    return (
        <Card sx={{ backgroundColor: "#27293d", flex: 1, pt : 2, px: 3 }}>
            <Box sx={{ borderBottom: "1px solid #50575E" }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: "#ffff" }}>
                    รายละเอียดคำสั่งซื้อหมายเลข : #{order?.orderId}
                </Typography>
            </Box>
            <Box mt={2}>
                <Typography variant="body2" sx={{ color: "#c3c3c3", fontSize: "14px" }} mt={{ xs: 0, md: 1 }}>
                    สั่งซื้อเมื่อ: <a className="text-white">{format(order?.createdAt || "", "d MMM yyyy h:mm a")}</a>
                </Typography>
                <Typography variant="body2" sx={{ color: "#c3c3c3", fontSize: "14px" }} mt={{ xs: 0, md: 1 }}>สถานะ: <a className="text-white">{order?.status === "PENDING" ? "รอดำเนินการ" : (order?.status === "COMPLETED" ? "จัดส่งสำเร็จ" : "ยกเลิก")}</a></Typography>
                <Typography variant="body2" sx={{ color: "#c3c3c3", fontSize: "14px" }} mt={{ xs: 0, md: 1 }}>
                    จะได้รับภายใน: <a className="text-white">ไม่มีกำหนด </a><a href="/client/about" className="text-[#2196f3]">หมายเหตุ</a>
                </Typography>
            </Box>
            <CardContent>
                <Stack spacing={2} mt={{ xs: 0, md: 1 }}>
                    {order?.items.map((item, index) => (
                        <Stack key={index} direction="row" spacing={2} justifyContent={"space-between"}>
                            <Box display={'flex'} justifyContent={'center'} alignItems={"center"}>
                                <img src={item.product.image?.[0]} alt={item.product.title} width={50} height={50} style={{ borderRadius: 8 }} />
                                <Box ml={2}>
                                    <Typography variant="body1" fontWeight={600} sx={{ color: "#ffff", fontSize: { xs: "12px", md: 16 } }}>{item.product.title}</Typography>
                                    <Typography variant="body2" sx={{ color: "#c3c3c3" }}>จำนวน: {item.quantity}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body1" fontWeight={600} sx={{ color: "#ffff" }}>฿{item.price.toLocaleString('th-TH')}</Typography>
                        </Stack>
                    ))}
                </Stack>
                <Box display={{ xs: "unset", md: "flex" }} justifyContent={{ xs: 'unset', md: 'end' }} alignItems={{ xs: "unset", md: "center" }}>
                    <Box mt={4} display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={6}>
                        <Box>
                            <Typography variant="body2" sx={{ textAlign: "end", color: "#c3c3c3" }}>ผลรวมยอด: </Typography>
                            <Typography variant="body2" sx={{ textAlign: "end", color: "#c3c3c3" }}>ส่วนลดคูปอง: </Typography>
                            <Typography variant="body2" sx={{ textAlign: "end", color: "#c3c3c3" }}>ค่าจัดส่ง: </Typography>
                            <Typography variant="h6" sx={{ textAlign: "end", color: "#ffff" }} fontWeight={700} mt={1}>ยอดรวม: </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ textAlign: "end", color: "#ffff" }}>฿{order?.total.toLocaleString('th-TH')}</Typography>
                            <Typography variant="body2" sx={{ textAlign: "end", color: "#ffff" }}>฿0</Typography>
                            <Typography variant="body2" sx={{ textAlign: "end", color: "#ffff" }}>฿0</Typography>
                            <Typography variant="h6" sx={{ textAlign: "end", color: "#ffff" }} fontWeight={700} mt={1}>฿{order?.total.toLocaleString('th-TH')}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductSide;