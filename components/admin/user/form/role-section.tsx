import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";

type RoleSelectionProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RoleSelection: React.FC<RoleSelectionProps> = ({ value, handleChange }) => {
  return (
    <>
      <Typography variant="body2" fontWeight={700} sx={{ mt: 3, mb: 1 }}>ให้ยศแก่ผู้ใข้</Typography>
      <FormControl sx={{ ml: 1 }}>
        <RadioGroup onChange={handleChange} value={value} name="role" sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <FormControlLabel
            value="member"
            control={<Radio sx={{ color: "#ffffff", '&.Mui-checked': { color: "primary.main" } }} />}
            label={<Typography sx={{ color: "whitesmoke" }}>Member</Typography>}
          />
          <FormControlLabel
            value="admin"
            control={<Radio sx={{ color: "#ffffff", '&.Mui-checked': { color: "primary.main" } }} />}
            label={<Typography sx={{ color: "whitesmoke" }}>Admin</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default RoleSelection;