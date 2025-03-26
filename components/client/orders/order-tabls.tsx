import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { FaRegFileLines } from 'react-icons/fa6'

type OrderStatus = 'all' | 'PENDING' | 'COMPLETED' | 'CANCELED';

const OrderTabs = ({ handleTabChange, tabIndex }: { tabIndex: OrderStatus, handleTabChange: (_event: React.SyntheticEvent, newValue: OrderStatus) => void }) => {
    const tabs = [
        { value: 'all', label: 'ทั้งหมด' },
        { value: 'PENDING', label: 'จัดเตรียมสินค้า' },
        { value: 'COMPLETED', label: 'ส่งมอบสินค้า' },
        { value: 'CANCELED', label: 'ยกเลิก' }
    ];

    return (
        <>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <FaRegFileLines />
                รายการคำสั่งซื้อ
            </Typography>

            <Box
                sx={{ mb: 4, tableLayout: "fixed" }}
                borderRadius={2}
                width="100%"
                maxWidth={'100%'}
            >
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="scrollable"
                    aria-label="Order Tabs"
                    sx={{
                        "& .MuiTab-root": {
                            textTransform: "none",
                            minWidth: { xs: "100px", sm: "100px" },
                        },
                        justifyContent: { xs: "center", sm: "flex-start" },
                    }}
                >
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.value}
                            value={tab.value}
                            label={tab.label}
                            sx={{
                                textTransform: "none",
                                minWidth: { xs: "100px", sm: "100px" },
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
        </>
    )
}

export default OrderTabs