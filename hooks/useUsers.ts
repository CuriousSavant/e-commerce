import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material';
import { User } from '@/types/user';
import { SortType, Role } from '@/types/components/filter-sort';
import { UserFormStateProps } from '@/types/components/create-user-form';
import { debounce } from "lodash";
import Swal from 'sweetalert2'

const useUser = () => {
    const [userList, setUserList] = useState<User[]>([]);

    const [userForm, setUserForm] = useState<UserFormStateProps>({
        firstname: "",
        lastname: "",
        email: "",
        role: "member",
        password: "",
        confirmPassword: "",
    });

    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [searchQuery, setSearchQuery] = useState<string>(''); // search
    const [sortOrder, setSortOrder] = useState<SortType>('asc'); // sort
    const [role, setRole] = useState<Role>('all') // filter by role
    const [loading, setLoading] = useState<boolean>(true);
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/user?sortOrder=${sortOrder}&query=${searchQuery}&role=${role}`)
            setUserList(res.data);
        } catch (err) {
            console.error("Error fetching users: " + err);
        } finally {
            setLoading(false);
        }
    }

    // เรียกใช้ fetchUsers เมื่อค่าใน dep มีการเปลี่ยนแปลง
    useEffect(() => {
        const delayedFetch = debounce(fetchUsers, 500);
        delayedFetch(); // delay เพื่อลดการเรียก api ที่ไม่จำเป็น
        return () => delayedFetch.cancel();
    }, [sortOrder, searchQuery, role])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        let { name, value } = e.target;

        setUserForm((prev) => ({ ...prev, [name]: value }));
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

        if (userForm.password && userForm.password.length < 8) {
            newErrors.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว";
        }

        if (!editingId) { // ถ้าไม่ได้ทำการแก้ไขข้อมูล
            if (!userForm.password) newErrors.password = "จำเป็นต้องกรอกรหัสผ่าน"

            if (!userForm.confirmPassword) newErrors.confirmPassword = "จำเป็นต้องกรอกยันยันรหัสผ่าน";

            if (userForm.password !== userForm.confirmPassword) {
                newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน"
                newErrors.password = "รหัสผ่านไม่ตรงกัน"
            };
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // คีนค่า true เมื่อไม่มี error
    }

    const handleReset = () => {
        setUserForm({
            firstname: "",
            lastname: "",
            email: "",
            role: "member",
            password: "",
            confirmPassword: "",
        });
        setFormOpen(!formOpen);
        setEditingId(null);
        fetchUsers();
    }

    const handleSignUp = async () => {
        if (!validateForm()) return; // เช็คว่า validateForm คืนค่ามาเป็น false ไหม

        let payload = {
            firstname: userForm.firstname,
            lastname: userForm.lastname,
            email: userForm.email,
            role: userForm.role,
        } as any;

        if (userForm.password) { // ถ้ามีการกรอกรหัสผ่าน
            payload.password = userForm.password;
        }

        if (!editingId) {
            await axios.post("/api/user",
                { ...payload, confirmPassword: userForm.confirmPassword } // เพิ่ม confirmPassword เข้าไปใน payload
            )
        }
        else {
            await axios.put(`/api/user/${editingId}`, payload)
        }
        handleReset();
    };

    const handleDeleteUser = async (userId: number, userName: string) => {
        if (!userId) return;
        try {
            const result = await Swal.fire({
                title: "คุณแน่ใจหรือไม่?",
                text: `คุณต้องการลบผู้ใช้ ${userName} นี้หรือไม่`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ใช่, ต้องการลบผู้ใช้นี้",
                cancelButtonText: "ยกเลิก",
                confirmButtonColor: "#ed1616",
            });

            if (result.isConfirmed) {
                await axios.delete(`/api/user/${userId}`);
                setUserList((prev) => prev.filter((user) => user.id !== userId));
                Swal.fire("ลบแล้ว!", "ผู้ใช้ถูกลบไปแล้ว", "success");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("เกิดข้อผิดพลาด!", "เกิดข้อผิดพลาด ไม่สามารถลบผู้ใช้นี้ได้", "error");
        }
    }

    const startEditing = (user: User) => {
        setEditingId(user.id || 0)
        setFormOpen(true)
        setUserForm({
            firstname: user.firstname,
            lastname: user.lastname || "",
            email: user.email,
            password: "",
            role: user.role,
        })
    }

    return {
        userList, setUserList,
        userForm, setUserForm,
        formOpen, setFormOpen,
        errors, setErrors,
        searchQuery, setSearchQuery,
        sortOrder, setSortOrder,
        role, setRole,
        loading, setLoading,
        editingId, setEditingId,
        fetchUsers,
        handleChange,
        validateForm,
        handleReset,
        handleSignUp,
        handleDeleteUser,
        startEditing,
    }
}

export default useUser;