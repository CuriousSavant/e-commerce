import { Card, CardContent, Box, Typography } from "@mui/material";
import { OrderItem } from "@/types/order";

const OrderCard = ({ item }: { item: OrderItem }) => {
    return (
        <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2}>
                    <Box sx={{ width: { xs: '100%', sm: '150px' }, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                        <img src={item.product.image?.[0]} alt="Product" style={{ width: '100%', maxWidth: '150px', borderRadius: 8, }} />
                    </Box>

                    {/* Product Details */}
                    <Box flex="1" display="flex" flexDirection="column" gap={1}>
                        <Typography
                            variant="body1"
                            fontWeight="bold"
                            fontSize={{ xs: '0.875rem', md: '1rem' }}
                        >
                            {item.product.title}
                        </Typography>
                        <Typography color="text.secondary" variant="subtitle2">
                            {item.product.description}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems={'end'} mt={2}>
                            <Typography fontSize="0.875rem" color="gray">
                                จำนวณ: {item.quantity}
                            </Typography>

                            {/* Total Price */}
                            <Typography
                                variant="subtitle1"
                                fontWeight="600"
                                fontSize={{ xs: '0.875rem', md: '1rem' }}
                                color="primary"
                            >
                                ฿{item.total.toLocaleString('th-TH')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default OrderCard;