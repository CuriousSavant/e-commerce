import { fieldProps } from "@/types/components/create-user-form";
import { Grid, SelectChangeEvent, TextField } from "@mui/material";

interface InputFieldProps {
    field: fieldProps;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
    errors: { [key: string]: string };
}

const InputField: React.FC<InputFieldProps> = ({
    field,
    handleChange,
    errors,
}) => {
    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label={field.lable}
                    type={field.type}
                    name={field.name}
                    value={field.value}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        style: { color: '#999' },
                        shrink: field.name === "birthday" ? true : undefined
                    }}
                    sx={{
                        bgcolor: 'secondary.dark',
                        borderRadius: 2,
                        color: "white",
                        input: { color: 'white' }
                    }}
                    onChange={handleChange}
                    error={!!errors[field.name]}
                    helperText={errors[field.name] || ""}
                />
            </Grid>
        </>
    )
}

export default InputField;