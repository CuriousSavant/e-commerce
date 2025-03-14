import { useState } from "react";
import axios from "axios";

export const useImageUpload = () => {
    const [imageUrl, setImageUrl] = useState<string[]>([]); // รูปทภาพ
    const [loadingImage, setLoadingImage] = useState<boolean>(false); // ตัวแปรสำหรับเก็บสถานะการโหลดรูปภาพ
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // รูปที่ถูกเลือก
    const [snackbarOpen, setSnackbarOpen] = useState(false); // สถานะของ snackbar
    const [deletedImage, setDeletedImage] = useState<string | null>(null); // รูปที่ถูกลบ
    const [deletedIndex, setDeletedIndex] = useState<number | null>(null); // ตำแหน่งของรูปที่ถูกลบ

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;

        setLoadingImage(true);

        if (!["image/jpg", "image/png", "image/jpeg"].includes(file.type)) {
            console.error('Invalid file type');
            setLoadingImage(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || '');

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
            setImageUrl([...imageUrl, response.data.secure_url]);
        } catch (error) {
            console.error('Image upload error:', error);
        } finally {
            setLoadingImage(false);
        }
    };

    return {
        imageUrl, loadingImage, selectedImage, snackbarOpen,
        setSelectedImage, setSnackbarOpen,
        handleUploadImage, setImageUrl, setDeletedImage,
        setDeletedIndex, deletedImage, deletedIndex,
    };
};
