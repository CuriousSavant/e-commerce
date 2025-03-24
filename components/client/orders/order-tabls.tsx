import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { FaRegFileLines } from 'react-icons/fa6'

const OrderTabs = ({ handleTabChange, tabIndex }: { tabIndex: number, handleTabChange: (_event: React.SyntheticEvent, newValue: number) => void }) => {
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
                {/* Tabs as Buttons */}
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
                    {["ทั้งหมด", "จัดเตรียมสินค้า", "ส่งมอบสินค้า", "ยกเลิก"].map(
                        (label, index) => (
                            <Tab
                                key={index}
                                sx={{
                                    textTransform: "none",
                                    minWidth: { xs: "100px", sm: "100px" },
                                }}
                                label={label}
                            />
                        )
                    )}
                </Tabs>
            </Box>
        </>
    )
}

export default OrderTabs