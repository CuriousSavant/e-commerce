import React, { FormEvent, useState } from "react";
import { Container, Grid, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { User } from "@/types/user";
import { Address } from "@/types/address";
import { Order, OrderItem } from "@/types/order";
import axios from "axios";
import { Product } from "@/types/product";
import FormUserAddress from "./order-edit/form-user-address";
import ProductList from "./order-edit/product-list";

interface OrderEditProps {
    order?: Order;
    user?: User;
    items?: OrderItem[];
    address?: Address;
    addressList: Address[];
    productList: Product[];
    onClose: () => void;
    fetchOrders: () => void;
    fetchAddressList: () => void;
}

export type UserInfo = {
    firstname?: string;
    lastname?: string;
    email?: string;
}

export type AddressInfo = {
    id?: number;
    fullName?: string;
    address?: string;
    phone?: string;
    subDistrict?: string;
    district?: string;
    province?: string;
    postalCode?: string;
    isDefault?: boolean;
}

const OrderEdit: React.FC<OrderEditProps> = ({
    address, onClose, items, user, fetchOrders,
    addressList, fetchAddressList, order, productList,
}) => {
    // state สำหรับข้อมูลผู้ใช้
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
    });

    // state สำหรับที่อยู่
    const [addressInfo, setAddressInfo] = useState<AddressInfo>({
        id: address?.id,
        fullName: address?.fullName,
        address: address?.address,
        phone: address?.phone,
        subDistrict: address?.subDistrict,
        district: address?.district,
        province: address?.province,
        postalCode: address?.postalCode,
        isDefault: address?.isDefault || true,
    });

    const [updatedItems, setUpdatedItems] = useState<OrderItem[]>(items || []); // รายการสินค้าที่แก้ไข

    // สำหรับเลือกสินค้า หรือ ที่อยู่ใน dialog popup
    const [openAddressDialog, setOpenAddressDialog] = useState<boolean>(false);
    const [openProductListDialog, setOpenProductListDialog] = useState<boolean>(false);

    const [userErrors, setUserErrors] = useState<{ [key: string]: string }>({});
    const [addressErrors, setAddressErrors] = useState<{ [key: string]: string }>({});

    const [errorLowProduct, setErrorLowProduct] = useState<boolean>(false);

    // function สำหรับอัพเดท
    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (updatedItems.length === 0) {
            setErrorLowProduct(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        try {
            await Promise.all([
                axios.put(`/api/user/${user?.id}`, userInfo), // อัพเดทข้อมูลผู้ใข้
                addressInfo.id ?
                    // หากมี id ของที่อยู่
                    axios.put(`/api/address/${addressInfo.id}`, addressInfo) // อัพเดทข้อมูลที่อยู่
                        .then(() => axios.put(`/api/order/${order?.id}`, { status: order?.status, addressId: addressInfo.id, items: updatedItems })) // หลังจากอัปเดตที่อยู่แล้ว ให้เพิ่มที่อยู่ลงในคำสั่งซื้อ 
                    :
                    // ในกรณีที่ผู้ใช้ไม่ได้ส่งที่อยู่มาด้วย(สร้างที่อยู่ใหม่)
                    axios.post('/api/address', { ...addressInfo, userId: user?.id })
                        .then((res) => axios.put(`/api/order/${order?.id}`, { status: order?.status, addressId: res.data.id, items: updatedItems })),

                // เพิ่มสินค้า
                axios.put(`/api/order/${order?.id}`, { status: order?.status, addressId: addressInfo.id, items: updatedItems }),
            ])

            // รีเฟรชข้อมูลหลังอัปเดต
            fetchOrders();
            fetchAddressList();
            setUserInfo({});
            setAddressInfo({});
            onClose();
        } catch (err) {
            console.error("Failed to update user or address:", err);
        }
    }

    // ฟังก์ชันลบสินค้า (แค่ย้ายไป removedItems)
    const handleRemoveProduct = (slug: string) => {
        setUpdatedItems(prevItems => prevItems.filter(item => {
            if (item.product.slug === slug) return false;
            return true;
        }));
    };

    const handleSelectProduct = (product: Product) => {
        setUpdatedItems((prevItems) => {
            const existingItem = prevItems.find(item => item.product.slug === product.slug);

            if (existingItem) { // ถ้าสินค้าที่เลือกมีอยู่แล้วใน items ให้เพิ่มจำนวน
                return prevItems.map(item =>
                    item.product.slug === product.slug
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { product, quantity: 1 } as any]; // ถ้าไม่มี item ให้เพิ่มสินค้า
            }
        });

        setOpenProductListDialog(false);
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;

        setUserInfo({ ...userInfo, [name]: value });
        setAddressErrors({ ...addressErrors, [name]: '' })
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        if (name === "phone") {
            value = value.replace(/\D/g, "");
            if (value.length <= 3) value = value;
            else if (value.length <= 6)
                value = `${value.slice(0, 3)} ${value.slice(3)}`;
            else
                value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(
                    6,
                    10
                )}`;
        }

        if (name === "postalCode" && !/^\d*$/.test(value)) return;
        // ให้ใส่ค่าไม่เกิน 5 ตัว
        if (name === "postalCode" && value.length > 5) return;

        setAddressInfo({ ...addressInfo, [name]: value });
        setAddressErrors({ ...addressErrors, [name]: '' })
    }

    const validateForm = () => {
        let isValid = true;
        const userErrorMessages: { [key: string]: string } = {};
        const addressErrorMessages: { [key: string]: string } = {};

        // ตรวจสอบข้อมูลผู้ใช้
        if (!userInfo.firstname) {
            userErrorMessages.firstname = "กรุณากรอกชื่อ";
            isValid = false;
        }
        if (!userInfo.lastname) {
            userErrorMessages.lastname = "กรุณากรอกนามสกุล";
            isValid = false;
        }
        if (!userInfo.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userInfo.email || "")) {
            userErrorMessages.email = "กรุณากรอกอีเมลที่ถูกต้อง";
            isValid = false;
        }

        // ตรวจสอบข้อมูลที่อยู่
        if (!addressInfo.fullName) {
            addressErrorMessages.fullName = "กรุณากรอกชื่อผู้รับ";
            isValid = false;
        }
        if (!addressInfo.address) {
            addressErrorMessages.address = "กรุณากรอกที่อยู่";
            isValid = false;
        }
        if (!addressInfo.phone || !/^\d{3} \d{3} \d{4}$/.test(addressInfo.phone)) {
            addressErrorMessages.phone = "กรุณากรอกเบอร์โทรที่ถูกต้อง";
            isValid = false;
        }
        if (!addressInfo.subDistrict) {
            addressErrorMessages.subDistrict = "กรุณากรอกตำบล/แขวง";
            isValid = false;
        }
        if (!addressInfo.district) {
            addressErrorMessages.district = "กรุณากรอกอำเภอ/เขต";
            isValid = false;
        }
        if (!addressInfo.province) {
            addressErrorMessages.province = "กรุณากรอกจังหวัด";
            isValid = false;
        }
        if (!addressInfo.postalCode || !/^\d{5}$/.test(addressInfo.postalCode)) {
            addressErrorMessages.postalCode = "กรุณากรอกรหัสไปรษณีย์ที่ถูกต้อง";
            isValid = false;
        }

        setUserErrors(userErrorMessages);
        setAddressErrors(addressErrorMessages);

        return isValid;
    };

    const userFields: { label: string, name: string }[] = [
        { label: "ชื่อ", name: "firstname" },
        { label: "นามสกุล", name: "lastname" },
        { label: "อีเมล", name: "email" },
    ]

    const addressFields: { label: string, name: string, multiline?: boolean, rows?: number }[] = [
        { label: "ชื่อผู้รับ", name: "fullName" },
        { label: "ที่อยู่", name: "address", multiline: true, rows: 3 },
        { label: "เบอร์โทร", name: "phone" },
        { label: "ตำบล/แขวง", name: "subDistrict" },
        { label: "อำเภอ/เขต", name: "district" },
        { label: "จังหวัด", name: "province" },
        { label: "รหัสไปรษณีย์", name: "postalCode" },
    ]

    return (
        <Container sx={{ backgroundColor: "primary.dark", minHeight: "100vh", '.css-1uc6w3x-MuiContainer-root': { px: 0 } }}>
            <IconButton sx={{ mb: 2 }} onClick={onClose}>
                <ArrowBack sx={{ color: "white" }} />
            </IconButton>
            <Grid container spacing={4} sx={{ p: 0 }}>
                <FormUserAddress
                    {...{
                        addressFields, addressInfo, addressList,
                        handleAddressChange, handleSave, handleSelectProduct,
                        handleUserChange, openAddressDialog, openProductListDialog,
                        productList, setAddressInfo, setOpenAddressDialog,
                        setOpenProductListDialog, userFields, userInfo, addressErrors, userErrors,
                    }} />
                <ProductList
                    {...{
                        handleRemoveProduct, openProductListDialog,
                        setOpenProductListDialog, updatedItems, errorLowProduct
                    }}
                />
            </Grid>
        </Container>
    );
};

export default OrderEdit;