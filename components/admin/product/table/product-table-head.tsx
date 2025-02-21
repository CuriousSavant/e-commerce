import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";

type ProductTableHeadProps = {
    selected: string[];
    products: any[];
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductTableHead: React.FC<ProductTableHeadProps> = ({
    selected,
    products,
    handleSelectAllClick,
}) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" size="small" sx={{ pt: 1.5 }}>
                    <Checkbox
                        indeterminate={selected.length > 0 && selected.length < products.length}
                        checked={products.length > 0 && selected.length === products.length}
                        onChange={handleSelectAllClick}
                    />
                </TableCell>
                <TableCell size="small" sx={{ pt: 1.5, whiteSpace: "pre", color: "white" }}>Product ID</TableCell>
                <TableCell size="small" sx={{ pt: 1.5, color: "white" }}>Name</TableCell>
                <TableCell size="small" sx={{ pt: 1.5, color: "white" }}>Category</TableCell>
                <TableCell size="small" sx={{ pt: 1.5, color: "white" }}>Stock</TableCell>
                <TableCell size="small" sx={{ pt: 1.5, color: "white" }}>Price</TableCell>
                <TableCell size="small" sx={{ pt: 1.5, color: "white" }}>Status</TableCell>
                <TableCell size="small" sx={{ pt: 1.5, color: "white" }}>Actions</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default ProductTableHead;