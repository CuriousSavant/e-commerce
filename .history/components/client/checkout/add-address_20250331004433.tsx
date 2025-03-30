"use client";
import React from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CircularProgress,
} from "@mui/material";
import { SlLocationPin } from "react-icons/sl";
import { useAddress } from "@/context/AddressContext";
import FormAddress from "./form-address";
import { useRouter } from 'next/navigation'

const AddAddress = () => {
    const {
        loading,
        isFormOpen,
        formData,
        formErrors,
        defaultAddress,
        handleChange,
        handleSubmit,
        handleClose,
    } = useAddress();

    const router = useRouter()

    return (
        <Box flex={2} display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: { xs: "1rem", md: "1.25rem" },
                    }}>
                    <SlLocationPin size={28} />
                    ที่อยู่จัดส่ง
                </Typography>
                {defaultAddress && (
                    <Button size="small" onClick={() => router.push('/client/profile/shipping-address')}>
                        <Typography variant="subtitle2" sx={{ fontSize: "14px" }}>
                            จัดการที่อยู่จัดส่ง
                        </Typography>
                    </Button>
                )}
            </Box>
            {!defaultAddress ? (
                <Card variant="outlined">
                    {loading ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            my={2}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                my: 2,
                            }}
                        >
                            <Typography
                                color="text.secondary"
                                mt={1}
                                textAlign="center"
                                sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                            >
                                ไม่มีที่อยู่จัดส่งสินค้า
                            </Typography>
                            <Button
                                variant="text"
                                size="small"
                                sx={{ mt: 1 }}
                                onClick={() => router.push('/client/profile/shipping-address')}
                            >
                                + เพิ่มที่อยู่
                            </Button>
                        </Box>
                    )}
                </Card>
            ) : (
                <Card key={defaultAddress.id} variant="outlined" sx={{ position: "relative" }}>
                    <CardContent>
                        <Typography variant="body1">{defaultAddress.fullName} - {defaultAddress.phone}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {defaultAddress.address}, {defaultAddress.subDistrict}, {defaultAddress.district},{" "}
                            {defaultAddress.province} - {defaultAddress.postalCode}
                        </Typography>
                    </CardContent>
                    <Box position={'absolute'} top={10} right={10}>
                        <Button onClick={() => router.push('/client/profile/shipping-address')} size="small">เปลี่ยน</Button>
                    </Box>
                </Card>
            )}

            {/* form สำหรับจัดการ */}
            <FormAddress
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                isFormOpen={isFormOpen}
            />
        </Box>
    );
};

export default AddAddress;