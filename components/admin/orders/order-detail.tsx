import { Order } from "@/types/order";
import { Box, Stack } from "@mui/system";
import UserSide from "./order-detail/user-side";
import ProductSide from "./order-detail/poduct-side";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

interface OrderDetailsProps {
    order: Order | undefined;
    onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
    return (
        <Box sx={{ backgroundColor: "#1e1e2f", minHeight: "100vh", color: "#ffff" }}>
            <IconButton sx={{ mb: 2 }} onClick={onClose}>
                <ArrowBack sx={{ color: "white" }} />
            </IconButton>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <ProductSide order={order} />
                <UserSide order={order} />
            </Stack>
        </Box>
    );
};

export default OrderDetails;