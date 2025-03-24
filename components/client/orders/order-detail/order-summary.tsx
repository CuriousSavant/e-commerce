import { Card, CardContent, Typography, Stack, Grid, Divider } from "@mui/material";
import { Order } from "@/types/order";

const OrderSummary = ({ order }: { order: Order }) => {
    return (
        <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
                <Typography
                    variant="body1"
                    fontWeight="600"
                >
                    สรุปคำสั่งซื้อ
                </Typography>
                <Stack spacing={1} mt={1}>
                    <Grid container justifyContent="space-between">
                        <Typography variant="subtitle2" sx={{ color: "gray" }}>ยอดรวม</Typography>
                        <Typography variant="subtitle2">฿{order.total.toLocaleString('th-TH')}</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between">
                        <Typography variant="subtitle2" sx={{ color: "gray" }}>ส่วนลด</Typography>
                        <Typography variant="subtitle2">$0</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between">
                        <Typography variant="subtitle2" sx={{ color: "gray" }}>ค่าส่ง</Typography>
                        <Typography variant="subtitle2">ฟรี</Typography>
                    </Grid>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Grid container justifyContent="space-between">
                    <Typography fontWeight="600">
                        ยอดสุทธิ
                    </Typography>
                    <Typography fontWeight="600" color="primary">
                        ${order.total.toLocaleString('th-TH')}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default OrderSummary;
