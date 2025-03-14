"use client";
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { FaMoneyBill } from "react-icons/fa6";
import { MdCreditCard } from "react-icons/md";
import PaymentMethod from "@/components/client/checkout/payment-method";
import OrderSummary from "@/components/client/checkout/order-summary";
import AddAddress from "@/components/client/checkout/add-address";
import useCart from "@/hooks/useCart";

const paymentMethods = [
    {
        icon: <FaMoneyBill size={28} color="#1e8449" />,
        title: "จัดส่งแบบปลายทาง",
        description: "แนะนำ",
        value: "cash_on_delivery",
    },
    {
        icon: <MdCreditCard size={28} color="#0d47a1" />,
        title: "บัตรเครดิต/เดบิต",
        value: "credit_card",
    },
];

const CheckoutPage = () => {
    const [selectedPayment, setSelectedPayment] = useState<string>("cash_on_delivery");

    const handlePaymentSelect = (methodValue: string) => {
        setSelectedPayment(methodValue);
    };

    const {
        cartItems,
        itemQuantities,
        cartTotalPrice,
        handleOrder,
        updateItemQuantity,
        setItemQuantities,
    } = useCart()

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 3 }, px: { xs: 2, md: 5 }, pt: { xs: 3, md: 5 }, }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <AddAddress />
                        <PaymentMethod
                            handlePaymentSelect={handlePaymentSelect}
                            paymentMethods={paymentMethods}
                            selectedPayment={selectedPayment}
                        />
                    </Box>
                </Grid>

                {/* สรุปคำสั่งซื้อ */}
                <Grid item xs={12} md={4}>
                    <OrderSummary
                        cartItems={cartItems}
                        itemQuantities={itemQuantities}
                        cartTotalPrice={cartTotalPrice}
                        handleOrder={handleOrder}
                        updateItemQuantity={updateItemQuantity}
                        setItemQuantities={setItemQuantities}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CheckoutPage;