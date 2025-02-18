'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, SelectChangeEvent, Typography, } from '@mui/material';
import { User } from '@/types/user';
import UsersTable from '@/components/admin/user/table/user-table';
import FilterSortSearch from '@/components/admin/user/filter-sort-search';
import { SortType, Role } from '@/types/components/filter-sort';
import CreateUserForm from '@/components/admin/user/form/create-user-form';
import { UserFormStateProps } from '@/types/components/create-user-form';
import { Address } from '@/types/address';

export default function Users() {
  const [searchQuery, setSearchQuery] = useState<string>(''); // search
  const [sortOrder, setSortOrder] = useState<SortType>('asc'); // sort
  const [role, setRole] = useState<Role>('all') // filter by role
  const [loading, setLoading] = useState<boolean>(true);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);

  const [userForm, setUserForm] = useState<UserFormStateProps>({
    firstname: "",
    lastname: "",
    email: "",
    role: "member",
    password: "",
    confirmPassword: "",
  });

  const [addressForm, setAddressForm] = useState<Address>({
    fullName: "",
    phone: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchUsers = async () => {
    setLoading(true);
    try {
      await axios.get(`/api/user?sortOrder=${sortOrder}&query=${searchQuery}&role=${role}`)
        .then((res) => { setUserList(res.data) })
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // เรียกใช้ fetchUsers เมื่อค่าใน dep มีการเปลี่ยนแปลง
  useEffect(() => {
    fetchUsers();
  }, [sortOrder, searchQuery, role])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    let { name, value } = e.target;

    // เช็ค format สำหรับค่าที่ส่งมาจาก form address
    if (name === "phone") {
      value = value.replace(/\D/g, "");
      if (value.length > 3) value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 10)}`;
    }

    // ให้ใส่ค่าได้ไม่เกิน 5 ตัว และต้องเป็นตัวเลขเท่า่นั้น
    if (name === "postalCode" && !/^\d*$/.test(value)) return;
    if (name === "postalCode" && value.length > 5) return;

    // เช็คว่าค่า name เป็นของ userForm หรือ addressForm
    if (Object.keys(userForm).includes(name)) {
      setUserForm((prev) => ({ ...prev, [name]: value }));
    } else if (Object.keys(addressForm).includes(name)) {
      setAddressForm((prev) => ({ ...prev, [name]: value }));
    }

    console.log(userForm)

    setErrors((prev) => ({ ...prev, [name]: "" })); // ล้าง error เมื่อผู้ใข้กำลังพิมพ์
  };

  // ตรวจจับความถูกต้องของ field
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!userForm.firstname) newErrors.firstname = "จำเป็นต้องกรอกชื่อผู้ใช้";
    if (!userForm.lastname) newErrors.lastname = "จำเป็นต้องกรองนามสกุล";

    if (!userForm.email) newErrors.email = "กรุณากรอกอีเมล";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userForm.email))
      newErrors.email = "อีเมลไม่ถูกต้อง";

    if (!userForm.password) newErrors.password = "จำเป็นต้องกรอกรหัสผ่าน"
    else if (userForm.password.length < 8) newErrors.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว";

    if (!userForm.confirmPassword) newErrors.confirmPassword = "จำเป็นต้องกรอกยันยันรหัสผ่าน";

    if (userForm.password !== userForm.confirmPassword) {
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน"
      newErrors.password = "รหัสผ่านไม่ตรงกัน"
    };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // คีนค่า true เมื่อไม่มี error
  }

  const handleSignUp = async () => {
    if (!validateForm()) return; // เช็คว่า validateForm คืนค่ามาเป็น false ไหม

    if (!editingId) {
      // await axios.post("/api/user", userForm).then(() => {
      // setUserForm({
      //   firstname: "",
      //   lastname: "",
      //   email: "",
      //   role: "member",
      //   password: "",
      //   confirmPassword: "",
      // })
      // setFormOpen(!formOpen)
      // fetchUsers();
      // })
    } else {
      axios.put("/api/user", userForm).then(() => {
        setUserForm({
          firstname: "",
          lastname: "",
          email: "",
          role: "member",
          password: "",
          confirmPassword: "",
        })
        setFormOpen(!formOpen)
        fetchUsers();
      })
    }
  };

  const handleDeleteUser = (customerId: number) => {
    if (!customerId) return;
    try {
      axios.delete(`/api/user/${customerId}`).then(() => {
        setUserList((prev) => prev.filter((user) => user.id !== customerId))
      }).catch(err => {
        console.error(err)
      })
    } catch (err) {
      console.error(err)
    }
  }

  const startEditing = (user: User) => {
    setEditingId(user.id || 0)
    setFormOpen(true)
    setUserForm({
      firstname: user.firstname,
      lastname: user.lastname || "",
      email: user.email,
      password: user.password,
      role: user.role,
    })
    console.log("from editingid function: ", editingId)
    console.log("from editingid function: ", formOpen)
    console.log("from editingid function: ", userForm)
    // setAddressForm({
    //   fullName: user.fullNae,
    //   lastname: user.lastname || "",
    //   email: user.email,
    //   password: user.password,
    //   role: user.role,
    //   confirmPassword: user.confirmPassword,
    // })
  }

  console.log("from นอกfunction: ", editingId)
  console.log("from นอกfunction: ", formOpen)
  console.log("from นอกfunction: ", userForm)

  return (
    <Box sx={{ bgcolor: "primary.dark", minHeight: "100vh", py: 2, px: 6 }}>
      <Typography variant="h5" mb={2} fontWeight={800} gutterBottom>
        {formOpen ? 'Create User' : (editingId ? "Update User" : "Users")}
      </Typography>

      {formOpen ? (
        <CreateUserForm
          formOpen={formOpen}
          editingId={editingId}
          errors={errors}
          userForm={userForm}
          addressForm={addressForm}
          setFormOpen={setFormOpen}
          setEditingId={setEditingId}
          handleChange={handleChange}
          handleSignUp={handleSignUp}
          setUserForm={setUserForm}
        />
      ) : (
        <>
          {/* <FilterSortSearch /> */}
          <FilterSortSearch
            setSortOrder={setSortOrder}
            sortOrder={sortOrder}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            setRole={setRole}
            role={role}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
          />

          {/* Table */}
          <UsersTable
            userList={userList}
            loading={loading}
            startEditing={startEditing}
          />
        </>
      )}
    </Box>
  )
}