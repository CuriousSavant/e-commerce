"use client"
import { Order } from "@/types/order";
import { Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { FC } from "react";

type ILatestOrderTable = {
    order?: Order;
    loading?: boolean;
}

const LatestOrderTable: FC<ILatestOrderTable> = ({ order, loading }) => {
    return (
        <TableRow>
            {loading ? (
                <>
                    <TableCell sx={{ borderBottom: "1px solid #50575E" }}>
                        <Skeleton variant="text" width={40} sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #50575E" }}>
                        <Skeleton variant="text" width={80} sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #50575E" }}>
                        <Skeleton variant="text" width={60} sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #50575E" }}>
                        <Skeleton variant="text" width={50} sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>{order?.id}</TableCell>
                    <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>{format(order!!.createdAt, "dd-MM-yyyy", { locale: th })}</TableCell>
                    <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>{order?.status}</TableCell>
                    <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>{order?.total}</TableCell>
                </>
            )}
        </TableRow>
    )
}

export default LatestOrderTable;
