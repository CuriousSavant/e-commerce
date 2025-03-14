import { Box, TextField, Typography } from "@mui/material";
import { UserInfo } from "../../order-edit";

interface UserFormEditProps {
    userFields: { label: string, name: string }[];
    userInfo: UserInfo;
    userErrors: { [key: string]: string }
    handleUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserFormEdit: React.FC<UserFormEditProps> = ({
    handleUserChange, userFields,
    userInfo, userErrors
}) => {
    return (
        <Box mb={2}>
            <Typography variant="h6" sx={{ color: "#ffff" }} gutterBottom>ข้อมูลผู้ใช้</Typography>
            {userFields.map((field, index) => (
                <TextField
                    key={index}
                    label={field.label}
                    name={field.name}
                    value={userInfo[field.name as keyof UserInfo]}
                    onChange={handleUserChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ style: { color: "#C0C0C0" } }}
                    sx={{ bgcolor: "secondary.dark", borderRadius: 2, mb: 2, border: "1px solid #4a4a5c", input: { color: "white" } }}
                    error={!!userErrors[field.name]}
                    helperText={userErrors[field.name]} // แสดงข้อความ error
                />
            ))}
        </Box>
    )
}

export default UserFormEdit;