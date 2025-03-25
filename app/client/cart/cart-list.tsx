import { Box, Typography, IconButton, Tooltip, Checkbox } from '@mui/material';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import { BiMinus } from 'react-icons/bi';
import Link from 'next/link';
import { Product } from '@/types/product';

interface CartItemProps {
    product: Product;
    index: number;
    selectedItems: number[];
    toggleSelectItem: (id: number) => void;
    updateItemQuantity: (id: number, isIncrement: boolean) => void;
    removeItemFromCart: (id: number) => void;
    itemQuantities: Record<number, number>;
}

const CartList = ({ product, index, selectedItems, toggleSelectItem, updateItemQuantity, removeItemFromCart, itemQuantities }: CartItemProps) => {
    return (
        <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid #f5f5f5"
            py={2}
        >
            <Box display="flex" alignItems="center" gap={{ xs: 0.5, md: 2 }} flex={2}>
                <Checkbox
                    checked={selectedItems.includes(product.id)}
                    onChange={() => toggleSelectItem(product.id)}
                />
                <Box
                    component="img"
                    src={product.image?.[0]}
                    alt={product.title}
                    sx={{ width: 48, height: 48, borderRadius: 1 }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        overflow: 'hidden',
                        maxWidth: '500px',
                    }}
                >
                    <Typography
                        component={Link}
                        href={`/client/${product.slug}`}
                        sx={{
                            fontSize: '14px',
                            ':hover': { textDecoration: 'underline' },
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            color: 'gray',
                        }}
                    >
                        {product.title}
                    </Typography>
                </Box>
                <Box sx={{ fontSize: 15 }}>฿{product.price.toLocaleString('th-TH')}</Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                    <IconButton
                        size="small"
                        onClick={() => updateItemQuantity(product.id, false)}
                        disabled={itemQuantities[product.id] <= 1}
                    >
                        <BiMinus />
                    </IconButton>
                    <Typography>{itemQuantities[product.id]?.toLocaleString('th-TH')}</Typography>
                    <IconButton
                        size="small"
                        onClick={() => updateItemQuantity(product.id, true)}
                    >
                        <MdAdd />
                    </IconButton>
                </Box>
            </Box>
            <Tooltip title="นำออกจากรถเข็น">
                <IconButton onClick={() => removeItemFromCart(product.id)}>
                    <MdDeleteOutline />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default CartList;
