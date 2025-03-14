import { Box, Checkbox, Chip, IconButton, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { Product } from "@/types/product";
import { Delete, Edit } from "@mui/icons-material";

interface ProductTableRowProps {
    product?: Product;
    selectedRow?: boolean;
    loading: boolean;
    handleClick: (event: React.MouseEvent<unknown>, slug: string) => void;
    handleDeleteProduct: (slug: string, productName: string) => void;
    startEditing: (product: any) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
    handleClick,
    handleDeleteProduct,
    product,
    startEditing,
    selectedRow,
    loading,
}) => {
    return (
        <TableRow key={product?.id}>
            <TableCell padding="checkbox" size="small" sx={{ borderBottom: "1px solid #50575E" }}>
                {loading ? (
                    <Skeleton width={40} />
                ) : (
                    <Checkbox
                        checked={selectedRow}
                        onClick={(e) => handleClick(e, product?.slug!!)}
                        sx={{
                            color: "#c0c0c0",
                            "&.Mui-checked": { color: "primary.main" },
                            "&.MuiCheckbox-indeterminate": { color: "primary.main" }
                        }}
                    />
                )}
            </TableCell>
            <TableCell size="small" sx={{ color: "white", borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={40} /> : product?.id}
            </TableCell>
            <TableCell sx={{ minWidth: 200, borderBottom: "1px solid #50575E" }} size="small">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {loading ? (
                        <>
                            <Skeleton width={40} />
                            <Skeleton width={40} />
                        </>
                    ) : (
                        <>
                            <img
                                src={product?.image?.[0]}
                                alt={product?.title}
                                style={{
                                    width: 40,
                                    height: 45,
                                    borderRadius: "5px",
                                    objectFit: "cover",
                                }} />
                            <Typography
                                sx={{ width: "100%", fontSize: "13px", color: "white" }}
                                className="line-clamp-1 w-[200px]">
                                {product?.title}
                            </Typography>
                        </>
                    )}
                </Box>
            </TableCell>
            <TableCell size="small" sx={{ color: "white", borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={40} /> : product?.category ? product?.category.name : "ไม่มีหมวดหมู่"}
            </TableCell>
            <TableCell size="small" sx={{ color: "white", borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={40} /> : `฿${product?.price.toLocaleString('th-TH')}`}
            </TableCell>
            <TableCell size="small" sx={{ borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={40} /> : (
                    <Chip
                        label={product?.status}
                        color={product?.status === "ACTIVE" ? "success" : "error"}
                        variant="outlined"
                        sx={{ fontWeight: "bold" }}
                    />
                )}
            </TableCell>
            <TableCell size="small" sx={{ color: "white", borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={40} /> : product?.stock}
            </TableCell>
            <TableCell size="small" sx={{ borderBottom: "1px solid #50575E" }}>
                <Box display={'flex'} alignItems={'center'}>
                    {loading ? (
                        <Box display="flex">
                            <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
                            <Skeleton variant="circular" width={32} height={32} />
                        </Box>
                    ) : (
                        <>
                            <IconButton onClick={() => startEditing(product)}>
                                <Edit sx={{ color: "#1976d2" }} />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteProduct(product?.slug!!, product?.title || "")}>
                                <Delete sx={{ color: "#FF0000" }} />
                            </IconButton>
                        </>
                    )}
                </Box>
            </TableCell>
        </TableRow>
    )
}

export default ProductTableRow;