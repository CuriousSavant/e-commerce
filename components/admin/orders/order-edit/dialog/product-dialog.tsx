import { Product } from "@/types/product";
import { Add } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";

interface AddressDialogProps {
    productList: Product[];
    handleSelectProduct: (product: Product) => void;
    openProductListDialog: boolean;
    setOpenProductListDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDialog: React.FC<AddressDialogProps> = ({
    handleSelectProduct, openProductListDialog,
    productList, setOpenProductListDialog,
}) => {
    return (
        <Dialog open={openProductListDialog} onClose={() => setOpenProductListDialog(!openProductListDialog)}>
            <DialogTitle sx={{ color: "white", bgcolor: "primary.dark", fontWeight: 700 }}>เลือกสินค้า</DialogTitle>
            <DialogContent sx={{ bgcolor: "primary.dark" }}>
                {productList.map((product, key) => (
                    <Box key={key} mb={2} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={1}>
                            <img src={product.image?.[0]} alt={product.title} className="w-[50px] h-[50px] rounded-lg" />
                            <Box display={'flex'} flexDirection={"column"}>
                                <Typography sx={{ color: "white" }} variant="body1" className="line-clamp-1">{product.title}</Typography>
                                <Typography sx={{ color: "#c3c3c3" }} variant="body2">฿{product.price.toLocaleString('th-TH')}</Typography>
                            </Box>
                        </Box>
                        <Box ml={4}>
                            <IconButton size="small" onClick={() => handleSelectProduct(product)}>
                                <Add sx={{ color: "white" }} />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </DialogContent>
        </Dialog>
    )
}

export default ProductDialog;