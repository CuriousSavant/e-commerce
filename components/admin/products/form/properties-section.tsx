import { Button, Grid, TextField, Typography, Box, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Propertie } from "@/types/product";

interface PropertiesSectionProps {
    properties: Propertie[];
    handlePropertyChange: (index: number, field: string, value: string) => void;
    handleRemoveProperty: (index: number) => void;
    handleAddProperty: () => void;
    errorProperties: string
}

const PropertiesSection = ({ properties, handlePropertyChange, handleRemoveProperty, handleAddProperty, errorProperties }: PropertiesSectionProps) => {
    return (
        <Box mt={3} p={2} border="1px solid #4a4a5c" borderRadius={2}>
            <Typography variant="h6" fontWeight={500} className="mb-2">
                คุณสมบัติสินค้า {errorProperties && <span className="text-red-500">({errorProperties})</span>}
            </Typography>
            {properties.map((prop, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                    <Grid item xs={5} mb={1}>
                        <TextField
                            label="ชื่อ"
                            variant="outlined"
                            size="small"
                            sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "1px solid #4a4a5c", input: { color: "white" }, "& .MuiInputBase-root": { color: "white" } }}
                            InputLabelProps={{ style: { color: "#C0C0C0" } }}
                            fullWidth
                            value={prop.name}
                            onChange={(e) => handlePropertyChange(index, "name", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5} mb={1}>
                        <TextField
                            label="ค่า"
                            variant="outlined"
                            size="small"
                            sx={{ bgcolor: "secondary.dark", borderRadius: 2, border: "1px solid #4a4a5c", input: { color: "white" }, "& .MuiInputBase-root": { color: "white" } }}
                            fullWidth
                            value={prop.value}
                            InputLabelProps={{ style: { color: "#C0C0C0" } }}
                            onChange={(e) => handlePropertyChange(index, "value", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={() => handleRemoveProperty(index)} color="error">
                            <Delete />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <Button onClick={handleAddProperty} startIcon={<Add />} variant="outlined" className="mt-2">
                เพิ่มคุณสมบัติ
            </Button>
        </Box>
    );
};

export default PropertiesSection;