import { Brand } from "@/types/brand";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Skeleton, TableCell, TableRow } from "@mui/material";

interface BrandsTableRowProps {
    brand?: Brand;
    loading: boolean;
    startEditingBrand: (brand: Brand) => void;
    handleDeleteBrand: (id: number, brandName: string) => void;
}

const BrandsTableRow: React.FC<BrandsTableRowProps> = ({
    brand, loading,
    handleDeleteBrand,
    startEditingBrand,
}) => {

    return (
        <TableRow key={brand?.id}>
            <TableCell sx={{ minWidth: "150px", borderBottom: "1px solid #50575E", color: "white", px: 3 }} size="small">
                {loading ? <Skeleton width={40} /> : brand?.id}
            </TableCell>
            <TableCell sx={{ minWidth: "150px", borderBottom: "1px solid #50575E", color: "white", px: 3 }} size="small">
                {loading ? <Skeleton width={40} /> : brand?.name}
            </TableCell>
            <TableCell sx={{ minWidth: "150px", borderBottom: "1px solid #50575E", color: "white", px: 3 }} size="small">
                {loading ? <Skeleton width={40} /> : brand?.image}
            </TableCell>
            <TableCell sx={{ minWidth: "150px", borderBottom: "1px solid #50575E", px: 3 }} size="small">
                <Box sx={{ display: "flex", gap: 1 }}>
                    {loading ? (
                        <>
                            <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
                            <Skeleton variant="circular" width={32} height={32} />
                        </>
                    ) : (
                        <>
                            <IconButton size="small" onClick={() => startEditingBrand(brand!!)}>
                                <Edit sx={{ color: "#1B6AF9" }} />
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDeleteBrand(brand!.id, brand!.name)}>
                                <Delete />
                            </IconButton>
                        </>
                    )}
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default BrandsTableRow;