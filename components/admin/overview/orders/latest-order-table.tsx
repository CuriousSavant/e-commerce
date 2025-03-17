"use client"
import { Order, STATUSORDER } from "@/types/order";
import { Avatar, Box, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { FC } from "react";

type ILatestOrderTable = {
    order?: Order;
    loading?: boolean;
}

const status_orders = {
    "PENDING": "#FFB74D",
    "COMPLETED": "#4CAF50",
    "CANCEL": "#F44336",
} as const;

const LatestOrderTable: FC<ILatestOrderTable> = ({ order, loading }) => {
    return (
        <TableRow>
            {loading ? (
                <>
                    <TableCell sx={{ borderBottom: "1px solid #50575E" }} size="small">
                        <Skeleton variant="text" width={40} />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #50575E", display: "flex" }} size="small">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box ml={1} display={'flex'} flexDirection={'column'}>
                            <Skeleton width={100} />
                            <Skeleton width={140} />
                        </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #50575E" }} size="small">
                        <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #50575E" }} size="small">
                        <Skeleton variant="text" width={60} />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #50575E" }} size="small">
                        <Skeleton variant="text" width={50} />
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E", px: 2 }}>{order?.id}</TableCell>
                    <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: "#4F4F4F" }} sizes="small">
                                {order?.user?.firstname?.charAt(0)}
                            </Avatar>
                            <Box ml={1}>
                                <Typography className="w-[120px] line-clamp-1">
                                    {`${order?.user?.firstname} ${order?.user?.lastname ? order?.user.lastname : ""}`}
                                </Typography>
                                <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
                                    {order?.user?.email}
                                </Typography>
                            </Box>
                        </Box>
                    </TableCell>
                    <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E", px: 2, whiteSpace: "pre" }}>{format(order!!.createdAt, "dd-MM-yyyy", { locale: th })}</TableCell>
                    <TableCell sx={{ color: status_orders[order?.status as keyof typeof status_orders] as any, borderBottom: "1px solid #50575E", px: 2 }}>{order?.status}</TableCell>
                    <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E", px: 2 }}>฿{order?.total.toLocaleString('th-TH')}</TableCell>
                </>
            )}
        </TableRow>
    )
}

export default LatestOrderTable;
