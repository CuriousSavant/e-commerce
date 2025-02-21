import { Box, Button, IconButton } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSortDown, BiSortUp } from "react-icons/bi";

type FilterSortSearchProductProps = {
    toggleSortOrder: () => void;
    sortOrder: string;
}

const FilterSortSearchProduct: React.FC<FilterSortSearchProductProps> = ({
    sortOrder,
    toggleSortOrder,
}) => {
    return (
        <>
            <Box
                sx={{ display: "flex", justifyContent: "end", alignItems: "center", mb: 2, }}>
                <IconButton
                    onClick={toggleSortOrder}
                    sx={{
                        textTransform: "none",
                        borderColor: "#D1D5DB",
                        color: "#4B5563",
                        ":hover": {
                            borderColor: "#9CA3AF",
                            backgroundColor: "#F3F4F6",
                        },
                    }}
                >
                    {sortOrder === "asc" ? <BiSortDown /> : <BiSortUp />}
                </IconButton>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={<AiOutlinePlus />}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#4F46E5",
                            ":hover": { backgroundColor: "#4338CA" },
                        }}
                    >
                        <Button onClick={() => setFormOpen(!formOpen)} sx={{ color: "white" }}>Create</Button>
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default FilterSortSearchProduct;