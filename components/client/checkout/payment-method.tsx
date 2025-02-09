import React, { useState } from 'react'
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Tooltip,
    IconButton,
} from "@mui/material";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FcShipped } from 'react-icons/fc';
import { BsTruck } from 'react-icons/bs';
import { MdHelpOutline } from 'react-icons/md';

type PaymentMethods = {
    icon: React.ReactNode;
    title: string;
    description?: string;
    value: string;
}

interface PaymentMethodProps {
    paymentMethods: PaymentMethods[]
    selectedPayment: string
    handlePaymentSelect: (methodValue: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
    paymentMethods,
    selectedPayment,
    handlePaymentSelect,
}) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    return (
        <Grid container spacing={2}>
            {/* Shipping Method */}
            <Grid item xs={12} md={6}>
                <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                        fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                >
                    <BsTruck size={28} />
                    รูปแบบการจัดส่ง
                </Typography>
                <Card variant="outlined">
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 1.5,
                                mt: 2,
                                p: 2,
                                border: "1px solid #0f63e9",
                                borderRadius: 1,
                                bgcolor: "#0f63e914",
                                textAlign: "left",
                                cursor: "pointer",
                            }}
                        >
                            {/* Icon และ Header */}
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                            >
                                <Box display="flex" alignItems="center" gap={1}>
                                    <FcShipped size={32} />
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                        sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                                    >
                                        ส่งด้วยใจ
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    fontWeight="bold"
                                    sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                                >
                                    ฟรี
                                </Typography>
                            </Box>

                            {/* Subtext */}
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                            >
                                จัดส่งแบบมาตรฐาน และจัดส่งฟรี! เมื่อซื้อสินค้าครบ 2,990 บาท
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 2,
                        fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                >
                    <RiMoneyDollarCircleLine size={28} />
                    ช่องทางการชำระเงิน
                </Typography>
                <Card variant="outlined">
                    <CardContent>
                        {paymentMethods.map((method, index) => (
                            <Box
                                key={index}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                mt={2}
                                p={2}
                                sx={{
                                    border:
                                        selectedPayment === method.value
                                            ? "1px solid #0f63e9"
                                            : "1px solid #ddd",
                                    borderRadius: 1,
                                    bgcolor:
                                        selectedPayment === method.value
                                            ? "#0f63e914"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                                onClick={() => handlePaymentSelect(method.value)}
                            >
                                <Box display="flex" alignItems="center" gap={1}>
                                    {method.icon}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: { xs: "0.9rem", md: "1rem" },
                                        }}
                                    >
                                        {method.title}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                                >
                                    {method.description || ""}
                                </Typography>
                            </Box>
                        ))}
                        {selectedPayment === "credit_card" && (
                            <Box mt={3}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    sx={{
                                        fontSize: { xs: "1rem", md: "1.125rem" },
                                    }}
                                >
                                    ป้อนข้อมูลบัตรเครดิต/เดบิต
                                    <Tooltip
                                        title="ยังไม่สามารถใช้งานได้เพื่อความปลอดภัย"
                                        open={showTooltip}
                                        onClose={() => setShowTooltip(false)}
                                        onOpen={() => setShowTooltip(true)}
                                        disableInteractive
                                    >
                                        <IconButton
                                            sx={{ ml: 1 }}
                                            onClick={() => setShowTooltip(true)}
                                        >
                                            <MdHelpOutline fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <TextField
                                        label="หมายเลขบัตร"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        disabled
                                    />
                                    <TextField
                                        label="ชื่อผู้ถือบัตร"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        disabled
                                    />
                                    <Box display="flex" gap={2}>
                                        <TextField
                                            label="วันหมดอายุ (MM/YY)"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            disabled
                                        />
                                        <TextField
                                            label="CVV"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            disabled
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default PaymentMethod