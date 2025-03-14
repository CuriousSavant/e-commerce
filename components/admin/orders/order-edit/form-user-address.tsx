import React, { FormEvent } from "react";
import { Grid, Button, Box } from "@mui/material";
import { Address } from "@/types/address";
import { Product } from "@/types/product";
import UserFormEdit from "./form/user-form-edit";
import ProductDialog from "./dialog/product-dialog";
import AddressDialog from "./dialog/address-dialog";
import { AddressInfo, UserInfo } from "../order-edit";
import AddressFormEdit from "./form/address-form-edit";

interface FormUserAddressProps {
    userFields: { label: string, name: string }[];
    addressFields: { label: string, name: string, multiline?: boolean, rows?: number }[];
    userInfo: UserInfo;
    addressInfo: AddressInfo;
    openProductListDialog: boolean;
    openAddressDialog: boolean;
    addressList: Address[];
    productList: Product[];
    userErrors: { [key: string]: string };
    addressErrors: { [key: string]: string };
    handleSelectProduct: (product: Product) => void;
    handleUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: (e: FormEvent) => void;
    setOpenAddressDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setAddressInfo: React.Dispatch<React.SetStateAction<AddressInfo>>;
    setOpenProductListDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormUserAddress: React.FC<FormUserAddressProps> = ({
    userFields, addressFields, addressInfo,
    handleAddressChange, handleUserChange, userInfo,
    handleSave, addressList, handleSelectProduct, productList,
    openAddressDialog, openProductListDialog, setAddressInfo,
    setOpenAddressDialog, setOpenProductListDialog, addressErrors,
    userErrors,
}) => {
    return (
        <Grid item xs={12} md={6} sx={{ p: 0, m: 0 }}>
            <Box component={"form"} sx={{ backgroundColor: "secondary.dark", p: 3 }} onSubmit={handleSave}>
                <UserFormEdit {...{ handleUserChange, userFields, userInfo, userErrors }} />
                <AddressFormEdit {...{ addressFields, addressInfo, handleAddressChange, openAddressDialog, setOpenAddressDialog, addressErrors }} />

                {openAddressDialog && <AddressDialog {...{
                    addressList, openAddressDialog,
                    setOpenAddressDialog, setAddressInfo,
                }} />}
                {openProductListDialog && <ProductDialog {...{
                    handleSelectProduct, openProductListDialog,
                    productList, setOpenProductListDialog,
                }} />}

                <Box display={'flex'} justifyContent={'end'} alignItems={'center'}>
                    <Button type="submit" variant="contained" sx={{ bgcolor: "primary.main" }}>บันทึก</Button>
                </Box>
            </Box>
        </Grid>
    )
}

export default FormUserAddress;