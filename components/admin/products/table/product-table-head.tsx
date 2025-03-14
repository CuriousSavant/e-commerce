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
            <TableRow sx={{ bgcolor: "secondary.dark" }}>
                <TableCell padding="checkbox" size="small" sx={{ pt: 1.5, borderBottom: "1px solid #50575E" }}>
                    <Checkbox
                        indeterminate={selected.length > 0 && selected.length < products.length}
                        checked={products.length > 0 && selected.length === products.length}
                        onChange={handleSelectAllClick}
                        sx={{
                            color: "#c0c0c0",
                            "&.Mui-checked": { color: "primary.main" },
                            "&.MuiCheckbox-indeterminate": { color: "primary.main" }
                        }}
                    />
                </TableCell>
                {["หมายเลขสินค้า", "ชื่อ", "หมวดหมู่", "ราคา", "สถานะ", "สต็อก", "การจัดการ"].map((headCell) => (
                    <TableCell key={headCell} sx={{ pt: 1.5, color: "white", borderBottom: "1px solid #50575E" }}>{headCell}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default ProductTableHead;