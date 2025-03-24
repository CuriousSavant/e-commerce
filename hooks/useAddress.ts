import { useState, useEffect } from "react";
import axios from "axios";
import { Address } from "@/types/address";
import { useSession } from "next-auth/react";

const useAddress = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allAddress, setAllAddress] = useState<Address[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<Address>({
    fullName: "",
    phone: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    type: "",
    isDefault: false,
  });

  const [formData, setFormData] = useState<Address>({
    fullName: "",
    phone: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    type: "",
    isDefault: false,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({
    fullName: false,
    phone: false,
    address: false,
    subDistrict: false,
    district: false,
    province: false,
    postalCode: false,
  });

  const { data: session } = useSession();

  const fetchAddresses = () => {
    setLoading(true);
    try {
      axios.get(`/api/address/${session?.user.id}`).then((res) => {
        setAllAddress(res.data);
        setDefaultAddress(res.data.find((i: Address) => i.isDefault));
      });
    } catch (err) {
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (field === "postalCode" && !/^\d*$/.test(value)) return;
      // ให้ใส่ค่าไม่เกิน 5 ตัว
      if (field === "postalCode" && value.length > 5) return;
      // format phoneNumber
      if (field === "phone") {
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

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      setFormErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    };

  const validateForm = (): boolean => {
    const errors: { [key: string]: boolean } = {};
    let hasError = false;

    Object.entries(formData).forEach(([key, value]) => {
      const valueAsString = String(value || "");

      if (key === 'type') return;

      if (!valueAsString.trim()) {
        errors[key] = true;
        hasError = true;
      }

      if (key === "postalCode" && !/^\d{5}$/.test(value)) {
        // ถ้า key postalCode ไม่เท่ากับ format ให้ error
        errors[key] = true;
        hasError = true;
      }

      if (key === "phone" && !/^\d{3} \d{3} \d{4}$/.test(value)) {
        // ถ้า key phoneNumber ไม่เท่ากับ format( 012 345 6789 ) ให้ error
        errors[key] = true;
        hasError = true;
      }
    });

    setFormErrors(errors);
    return !hasError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditMode && formData.id) {
        await axios.put(`/api/address/${formData.id}`, formData);
      } else {
        await axios.post("/api/address", formData);
      }
      fetchAddresses();
      handleClose();
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/address/${id}`);
      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  const handleSetDefaultAddress = async (addressId: number) => {
    try {
      await axios.put(`/api/address/${addressId}`, { isDefault: true });
      fetchAddresses();
    } catch (err) {
      console.error("Error setting default address:", err);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      phone: "",
      address: "",
      subDistrict: "",
      district: "",
      province: "",
      postalCode: "",
      type: "",
    });
    setFormErrors({
      fullName: false,
      phone: false,
      address: false,
      subDistrict: false,
      district: false,
      province: false,
      postalCode: false,
    });
    setIsEditMode(false);
    setIsFormOpen(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    allAddress,
    formData,
    formErrors,
    loading,
    isEditMode,
    isFormOpen,
    setIsFormOpen,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleClose,
    handleSetDefaultAddress,
    defaultAddress,
  };
};

export default useAddress;
