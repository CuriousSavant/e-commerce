import { Add } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { Address } from "@/types/address";
import React from "react";

interface AddressDialogProps {
    openAddressDialog: boolean;
    setOpenAddressDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setAddressInfo: React.Dispatch<React.SetStateAction<Address>>
    addressList: Address[];
}

const AddressDialog: React.FC<AddressDialogProps> = ({
    addressList, openAddressDialog,
    setAddressInfo, setOpenAddressDialog,
}) => {
    const onSelectAddress = (address: Address) => {
        setAddressInfo(address as any);
        setOpenAddressDialog(false);
    }

    return (
        <>
            <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(!openAddressDialog)}>
                <DialogTitle sx={{ color: "white", bgcolor: "primary.dark", fontWeight: 700 }}>เลือกที่อยู่จัดส่ง</DialogTitle>
                <DialogContent sx={{ bgcolor: "primary.dark" }}>
                    {addressList.map((address) => (
                        <Box mb={2} display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                <Typography sx={{ color: "white" }} variant="body1" className="line-clamp-2">{address.fullName}</Typography>
                                <Typography sx={{ color: "#c3c3c3" }} variant="body2">เบอร์โทร: {address.phone}</Typography>
                                <Typography sx={{ color: "#c3c3c3" }} variant="body2" className="line-clamp-2">รายละเอียดที่อยู่: {address.address}, {address.subDistrict}, {address.district}, {address.province} {address.postalCode} </Typography>
                            </Box>
                            <Box>
                                <IconButton size="small" onClick={() => onSelectAddress(address)}>
                                    <Add sx={{ color: "white" }} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddressDialog;