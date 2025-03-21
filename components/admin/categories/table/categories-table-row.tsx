import { Delete, Edit } from "@mui/icons-material";
import { Box, Chip, IconButton, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { Category } from '@/types/product';

interface CategoriesTableRowProps {
  category?: Category;
  parentCategory?: Category | undefined;
  loading: boolean;
  startEditingCategory: (category: Category) => void;
  handleDeleteCategory: (id: number, name: string) => void;
}

const CategoriesTableRow: React.FC<CategoriesTableRowProps> = ({
  category,
  handleDeleteCategory,
  startEditingCategory,
  parentCategory,
  loading,
}) => {

  return (
    <TableRow key={category?.id}>
      <TableCell sx={{ minWidth: "150px", borderBottom: "1px solid #50575E", color: "white", px: 3 }} size="small">
        {loading ? <Skeleton width={40} /> : category?.id}
      </TableCell>
      <TableCell sx={{ minWidth: "150px", borderBottom: "1px solid #50575E", color: "white", px: 3, maxWidth: { xs: "400px", md: "220px" } }} size="small">
        <Typography variant="body2" className="line-clamp-1 w-[260px] max-w-full">
          {loading ? <Skeleton width={40} /> : category?.name}
        </Typography>
      </TableCell>
      <TableCell sx={{ minWidth: "150px", borderBottom: "1px solid #50575E", color: "white", px: 3 }} size="small">
        {loading ? <Skeleton width={40} /> : parentCategory?.name || "-"}
      </TableCell>
      <TableCell sx={{ minWidth: "150px", borderBottom: "1px solid #50575E", color: "white", px: 3 }} size="small">
        {loading ? (
          <Skeleton width={60} />
        ) : (
          <Chip label={category?.status === "ACTIVE" ? "เปิดใช้งาน" : "ปิดใช้งาน"} color={category?.status === "ACTIVE" ? "success" : "error"} variant="outlined" sx={{ fontWeight: "bold", border: 0 }} />
        )}
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
              <IconButton size="small" onClick={() => startEditingCategory(category!)}>
                <Edit sx={{ color: "#1B6AF9" }} />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => handleDeleteCategory(category!.id, category!.name)}>
                <Delete />
              </IconButton>
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default CategoriesTableRow;