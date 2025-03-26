import { Button, Tooltip } from "@mui/material"
import { CiLogin } from "react-icons/ci"

const LoginRegisterButton = ({ handleDialogToggle }: { handleDialogToggle: () => void }) => {
    return (
        <Tooltip title="Login/Register">
            <Button
                onClick={handleDialogToggle}
                sx={{ color: "black", width: { xs: "100%", md: "auto" }, py: { xs: 2, md: 1 }, border: { xs: "1px solid #ddd", md: "0px" } }}
            >
                <CiLogin size={22} />
            </Button>
        </Tooltip>
    )
}

export default LoginRegisterButton;