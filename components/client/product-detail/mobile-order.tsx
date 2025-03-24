import { Product } from "@/types/product";
import { Add, Favorite, FavoriteBorder, Remove } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";

const MobileOrder: React.FC<{
    product: Product;
    isMediumScreen: boolean;
    quantity: number;
    handleDecrease: () => void;
    handleIncrease: () => void;
    handleAddToCart: (product: Product, quantity: number) => void;
    handleAddToWishlist: (productId: number) => void;
    isFavorite: boolean;
}> = ({ isMediumScreen, quantity, handleDecrease, handleIncrease, handleAddToCart, handleAddToWishlist, isFavorite, product }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-[9999]">
            {/* แสดงเมื่อขนาด 600px ลงไป */}
            {!isMediumScreen && (
                <div className="items-center flex justify-between gap-4 p-4 bg-white">

                    {/* cols 1 */}
                    <div className="flex flex-col">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <IconButton
                                size="small"
                                disabled={quantity <= 1}
                                onClick={handleDecrease}
                            >
                                <Remove />
                            </IconButton>
                            <Typography
                                variant="body1"
                                textAlign="center"
                                className="w-10 font-bold"
                            >
                                {quantity}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={handleIncrease}
                                disabled={quantity >= product.stock}
                            >
                                <Add />
                            </IconButton>
                        </div>
                        {quantity === product.stock && (
                            <p className="text-sm text-red-500 font-semibold">สินค้าหมด</p>
                        )}
                    </div>

                    {/* cols 2 */}
                    <div className="flex justify-end items-center gap-2">
                        {/* <IconButton
                            onClick={() => handleAddToWishlist(product.id)}
                            className={`${isFavorite ? 'border-red-500 text-red-500' : 'border-gray-400 text-gray-400'}`}
                            size={"small"}
                        >
                            {isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton> */}
                        <Button variant="outlined" sx={{ color: "#0f63e9", px: "32px" }} onClick={() => handleAddToCart(product, quantity)}>ใส่รถเข็น</Button>
                        <Button variant="contained" className="px-8 bg-[#0f63e9]">ซื้อเลย</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MobileOrder;