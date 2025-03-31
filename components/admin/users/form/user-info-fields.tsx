import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import React from "react";
import { UserFormStateProps } from "../types/user-form-state-props";

type UserInfoFieldsProps = {
  userForm: UserFormStateProps;
  errors: { [key: string]: string };
  showPassword: boolean;
  showConfirmPassword: boolean;
  editingId: number | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleShowPassword: (field: "password" | "confirmPassword") => void;
};

const userFields = [
  { label: "ชื่อ", name: "firstname" },
  { label: "นามสกุล", name: "lastname" },
  { label: "อีเมล", name: "email" },
  { label: "รหัสผ่าน", name: "password", type: "password" },
  { label: "ยืนยันรหัสผ่าน", name: "confirmPassword", type: "password" },
];

const UserInfoFields: React.FC<UserInfoFieldsProps> = ({
  userForm,
  errors,
  handleChange,
  showPassword,
  showConfirmPassword,
  toggleShowPassword,
  editingId,
}) => {
  return (
    <Grid container spacing={2}>
      {userFields
        .filter((field) => !(field.name === "confirmPassword" && editingId))
        .map((field) => (
          <Grid item xs={12} key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              variant="outlined"
              size="small"
              type={
                field.name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : field.name === "confirmPassword"
                    ? showConfirmPassword
                      ? "text"
                      : "password"
                    : field.type || "text"
              }
              name={field.name}
              value={userForm[field.name as keyof UserFormStateProps]}
              onChange={handleChange}
              error={!!errors[field.name]}
              helperText={errors[field.name] || ""}
              InputLabelProps={{ style: { color: "#C0C0C0" } }}
              sx={{ bgcolor: "secondary.dark", borderRadius: 2, input: { color: "white" }, border: "1px solid #4a4a5c", }}
              InputProps={{
                endAdornment:
                  field.name === "password" || field.name === "confirmPassword" ? (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => toggleShowPassword(field.name as "password" | "confirmPassword")}>
                        {field.name === "password"
                          ? showPassword
                            ? <FiEye fontSize={16} color="white" />
                            : <FiEyeOff fontSize={16} color="white" />
                          : showConfirmPassword
                            ? <FiEye fontSize={16} color="white" />
                            : <FiEyeOff fontSize={16} color="white" />
                        }
                      </IconButton>
                    </InputAdornment>
                  ) : null,
              }}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default UserInfoFields;
