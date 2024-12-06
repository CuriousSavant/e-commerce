import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

type PasswordInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

function PasswordInput({ label, value, onChange }: PasswordInputProps) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const toggleVisibility = () => setPasswordVisible(!passwordVisible);

    return (
        <TextField
            label={label}
            type={passwordVisible ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={toggleVisibility} edge="end">
                            {passwordVisible ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default PasswordInput;
