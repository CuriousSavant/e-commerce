import { Product } from "@/types/product";
import { Add, Favorite, FavoriteBorder, Remove, ShoppingCart } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";

interface ProductInfoProps {
    product: Product;
    isMediumScreen: boolean;
    quantity: number;
    isFavorite: boolean;
    handleAddToCart: (product: Product, quantity: number) => void;
    handleAddToWishlist: (productId: number) => void;
    handleIncrease: () => void;
    handleDecrease: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    product, handleAddToCart, handleAddToWishlist,
    handleDecrease, handleIncrease,
    isFavorite, isMediumScreen, quantity,
}) => {
    return (
        <div className="flex flex-col bg-white p-2 md:p-4 rounded-lg">
            <Typography fontWeight={800} fontSize={{ xs: "20px", md: "24px" }} className="mb-2">
                {product.title}
            </Typography>
            <Typography sx={{ mb: 2, color: 'gray' }} variant="subtitle2">{product.description}</Typography>

            {/* แสดงราคาสินค้า(ในขนาดใหญ่) */}
            <div className="flex items-center gap-2 mb-2">
                <Typography
                    color="primary"
                    fontSize={"26px"}
                    fontWeight={800}
                    className="text-blue-500"
                >
                    ฿{product.price.toLocaleString('th-Th')}
                </Typography>
            </div>

            {/* รายละเอียดสินค้า */}
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
                <h1 className="font-bold text-lg mb-2">รายละเอียดสินค้า</h1>
                <p className="text-sm mb-4">
                    สินค้าของเราถูกออกแบบมาให้มีคุณภาพสูงสุดเพื่อความพึงพอใจของคุณ
                </p>
            </div>

            {/* แสดงเมื่อขนาด 600px ขึ้นไป */}
            {isMediumScreen && (
                <>
                    <div className="items-center gap-4">
                        <div className="flex items-center rounded-lg overflow-hidden mb-2">
                            <p className="text-sm">จำนวน:</p>
                            <IconButton size="small" disabled={quantity <= 1} onClick={handleDecrease}>
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

                        <div className="flex flex-col sm:flex-row gap-2">
                            <IconButton
                                onClick={() => handleAddToWishlist(product.id)}
                                className={`${isFavorite ? 'border-red-500 text-red-500' : 'border-gray-400 text-gray-400'}`}
                                size={"large"}
                            >
                                {isFavorite ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                            <Button
                                startIcon={<ShoppingCart />}
                                className="bg-[#0f63e929] text-blue-500 w-full py-3"
                                onClick={() => handleAddToCart(product, quantity)}
                                size="medium"
                            >
                                เพิ่มลงตะกร้า
                            </Button>
                            <Button
                                variant="contained"
                                // onClick={() => status === 'unauthenticated' ? setIsDialogOpen(true) : handleOrder()}
                                className="bg-[#0f63e9] w-full py-3"
                                size="medium"
                            >
                                สั่งซื้อ
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default ProductInfo;