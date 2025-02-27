import { Box, Checkbox, Chip, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { Product } from "@/types/product";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

type ProductTableRowProps = {
    product: Product;
    handleClick: (event: React.MouseEvent<unknown>, slug: string) => void;
    handleDeleteProduct: (slug: string, title: string) => void;
    startEditing: (product: any) => void;
    selectedRow: boolean;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
    handleClick,
    handleDeleteProduct,
    product,
    startEditing,
    selectedRow,
}) => {
    return (
        <TableRow key={product.id}>
            <TableCell padding="checkbox" size="small" sx={{ borderBottom: "1px solid #50575E" }}>
                <Checkbox
                    checked={selectedRow}
                    onClick={(e) => handleClick(e, product.slug!!)}
                    sx={{
                        color: "#c0c0c0",
                        "&.Mui-checked": { color: "primary.main" },
                        "&.MuiCheckbox-indeterminate": { color: "primary.main" }
                    }}
                />
            </TableCell>
            <TableCell size="small" sx={{ color: "white", borderBottom: "1px solid #50575E" }}>{product.id}</TableCell>
            <TableCell sx={{ minWidth: 200, borderBottom: "1px solid #50575E" }} size="small">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                        src={product.image?.[0]}
                        alt={product.title}
                        style={{
                            width: 40,
                            height: 45,
                            borderRadius: "5px",
                            objectFit: "cover",
                        }} />
                    <Typography
                        sx={{ width: "100%", fontSize: "13px", color: "white" }}
                        className="line-clamp-1 w-[200px]">
                        {product.title}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell size="small" sx={{ color: "white", borderBottom: "1px solid #50575E" }}>{product.category ? product.category.name : "ไม่มีหมวดหมู่"}</TableCell>
            <TableCell size="small" sx={{ color: "white", borderBottom: "1px solid #50575E" }}>฿{product.price.toLocaleString('th-TH')}</TableCell>
            <TableCell size="small" sx={{ borderBottom: "1px solid #50575E" }}>
                <Chip
                    label={product.status}
                    color={product.status === "ACTIVE" ? "success" : "error"}
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                />
            </TableCell>
            <TableCell size="small" sx={{ color: "white", borderBottom: "1px solid #50575E" }}>{product.stock}</TableCell>
            <TableCell size="small" sx={{ borderBottom: "1px solid #50575E" }}>
                <Box display={'flex'} alignItems={'center'}>
                    <IconButton onClick={() => startEditing(product)}>
                        <BiEdit color="#1976d2" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product.slug!!, product.title)}>
                        <MdDelete color="#FF0000" />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    )
}

export default ProductTableRow;