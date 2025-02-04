"use client";
import React from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    Grid,
    TextField,
} from "@mui/material";
import { HiOutlineHome } from "react-icons/hi";
import { Address } from '@/types/address';

interface FormAddressProps {
    isFormOpen: boolean;
    formData: Address;
    formErrors: { [key: string]: boolean }
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClose: () => void;
}

const FormAddress: React.FC<FormAddressProps> = ({
    formData,
    handleChange,
    handleClose,
    handleSubmit,
    isFormOpen,
    formErrors,
}) => {
    return (
        <Dialog open={isFormOpen}>
            <Box p={3}>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    gap={1}
                    mb={4}
                >
                    <Typography sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 600 }}>
                        <HiOutlineHome size={30} />
                        ที่อยู่จัดส่งสินค้า
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container xs={12} gap={{ xs: 2, md: 1 }} sx={{ display: "grid" }}>
                        <TextField
                            size="small"
                            label="ชื่อ - นามสกุล"
                            className="col-span-2 md:col-span-1"
                            value={formData.fullName}
                            error={formErrors.fullName}
                            helperText={formErrors.fullName ? "กรุณากรอกชื่อ - นามสกุล" : ""}
                            onChange={handleChange("fullName")}
                            autoFocus
                        />
                        <TextField
                            size="small"
                            label="หมายเลขโทรศัพท์"
                            className="col-span-2 md:col-span-1"
                            value={formData.phoneNumber}
                            error={formErrors.phoneNumber}
                            helperText={formErrors.phoneNumber ? "กรุณากรอกหมายเลขโทรศัพท์" : ""}
                            onChange={handleChange("phoneNumber")}
                        />
                        <TextField
                            size="small"
                            label="ที่อยู่"
                            value={formData.address}
                            rows={4}
                            multiline
                            className="col-span-2"
                            placeholder="12/123 อาคาร/ถนน...."
                            error={formErrors.address}
                            helperText={formErrors.address ? "กรุณากรอกที่อยู่" : ""}
                            onChange={handleChange("address")}
                        />
                        <TextField
                            size="small"
                            label="แขวง/ตำบล"
                            value={formData.subDistrict}
                            className="col-span-2 md:col-span-1"
                            error={formErrors.subDistrict}
                            helperText={formErrors.subDistrict ? "กรุณากรอกแขวง/ตำบล" : ""}
                            onChange={handleChange("subDistrict")}
                        />
                        <TextField
                            size="small"
                            label="อำเภอ/เขต"
                            className="col-span-2 md:col-span-1"
                            value={formData.district}
                            error={formErrors.district}
                            helperText={formErrors.district ? "กรุณากรอกอำเภอ/เขต" : ""}
                            onChange={handleChange("district")}
                        />
                        <TextField
                            size="small"
                            label="จังหวัด"
                            className="col-span-2 md:col-span-1"
                            value={formData.province}
                            error={formErrors.province}
                            helperText={formErrors.province ? "กรุณากรอกจังหวัด" : ""}
                            onChange={handleChange("province")}
                        />
                        <TextField
                            size="small"
                            label="รหัสไปรษณีย์"
                            className="col-span-2 md:col-span-1"
                            value={formData.postalCode}
                            error={formErrors.postalCode}
                            helperText={
                                formErrors.postalCode
                                    ? "กรุณากรอกเฉพาะตัวเลข 5 หลัก"
                                    : ""
                            }
                            onChange={handleChange("postalCode")}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                            <Typography sx={{ display: "flex", alignItems: "center", color: "gray" }}>
                                เลือกสถานที่
                                <span className="text-sm">(ใส่หรือไม่ใส่ก็ได้)</span>
                            </Typography>

                            <TextField
                                size="small"
                                label="ที่บ้าน หรือ office"
                                className="col-span-2 md:col-span-1"
                                value={formData.type || ""}
                                onChange={handleChange("type")}
                            />
                        </Box>
                    </Grid>
                    <Box display={'flex'} justifyContent={'end'} alignContent={'center'} mt={2} gap={1}>
                        <Button
                            variant="outlined"
                            sx={{ px: 6 }}
                            onClick={handleClose}
                        >ยกเลิก</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ bgcolor: "secondary.main", px: 6 }}
                        >บันทึก</Button>
                    </Box>
                </form>
            </Box>
        </Dialog>
    )
}

export default FormAddress;