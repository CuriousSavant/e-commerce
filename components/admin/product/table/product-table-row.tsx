import { Box, Checkbox, Chip, IconButton, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { Product } from "@/types/product";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

type ProductTableRowProps = {
    products: Product[];
    page: number;
    rowsPerPage: number;
    isSelected: (slug: string) => boolean;
    handleClick: (event: React.MouseEvent<unknown>, slug: string) => void;
    handleDeleteProduct: (slug: string, title: string) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
    handleClick,
    handleDeleteProduct,
    isSelected,
    page,
    products,
    rowsPerPage,
}) => {
    return (
        <>
            <TableBody>
                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
                    const selectedRow = isSelected(product.slug!!);
                    return (
                        <TableRow
                            key={product.id}
                            sx={{
                                backgroundColor: selectedRow ? "#e3f2fd" : "inherit",
                                "&:hover": {
                                    backgroundColor: selectedRow ? "#d0ebfa" : "#f5f5f5",
                                },
                            }}>
                            <TableCell padding="checkbox" size="small">
                                <Checkbox
                                    checked={selectedRow}
                                    onClick={(e) => handleClick(e, product.slug!!)}
                                />
                            </TableCell>
                            <TableCell size="small">
                                <Typography
                                    sx={{
                                        color: "#4F46E5",
                                        fontWeight: "bold",
                                    }}>
                                    {product.id}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ minWidth: 200 }} size="small">
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <img
                                        // src={product.image?.[0]}
                                        alt={product.title}
                                        style={{
                                            width: 40,
                                            height: 45,
                                            borderRadius: "5px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: 2,
                                            width: "100%",
                                            fontSize: "13px",
                                        }}
                                    >
                                        {product.title}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell size="small">
                                <Chip
                                    // label={product.createory.name || "Uncategorized"}
                                    sx={{
                                        backgroundColor: "#F3F4F6",
                                        color: "#374151",
                                        fontWeight: "bold",
                                    }}
                                />
                            </TableCell>
                            <TableCell size="small">{product.stock}</TableCell>
                            <TableCell size="small">${product.price.toLocaleString('th-TH')}</TableCell>
                            <TableCell size="small">
                                <Chip
                                    label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                                    color={product.stock > 0 ? "success" : "error"}
                                    sx={{ fontWeight: "bold" }}
                                />
                            </TableCell>
                            <TableCell size="small">
                                <Box display={'flex'} alignItems={'center'}>
                                    <IconButton>
                                        <Link href={`/admin/products/edit/${product.slug}`}>
                                            <BiEdit color="#1976d2" />
                                        </Link>
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteProduct(product.slug!!, product.title)}>
                                        <MdDelete color="#FF0000" />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </>
    )
}

export default ProductTableRow;