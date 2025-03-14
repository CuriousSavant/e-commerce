import { CloudUpload } from '@mui/icons-material';
import { Box, Button, CircularProgress, Typography } from "@mui/material";

interface UploadImageProps {
    loading: boolean;
    image: string | null;
    onClose: () => void;
    handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({
    handleUploadImage,
    loading,
    image,
    onClose,
}) => {
    return (
        <>
            <Box>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    id="upload-image"
                    style={{ display: "none" }}
                    onChange={handleUploadImage}
                />
                <label htmlFor="upload-image">
                    <Button
                        component="span"
                        variant="contained"
                        startIcon={<CloudUpload />}
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            '&:hover': { bgcolor: "primary.dark" },
                            mt: 1,
                            width: "100%",
                            textTransform: "none",
                        }}
                        disabled={loading}
                    >
                        {loading ? "กำลังอัปโหลด..." : "อัปโหลดรูปภาพ"}
                    </Button>
                </label>

                {/* ข้อความแนะนำในการอัปโหลด */}
                <Typography variant='body2' color="white" sx={{ mt: 1 }}>
                    อัปโหลดไฟล์ PNG, JPG หรือ JPEG เท่านั้น
                </Typography>

                {/* แสดง Loading ตอนอัปโหลด */}
                {loading && (
                    <Box mt={1} display="flex" alignItems="center" gap={1}>
                        <CircularProgress size={20} sx={{ color: "white" }} />
                        <Typography variant='body2' color="white">กำลังอัปโหลด...</Typography>
                    </Box>
                )}

                {/* แสดงตัวอย่างรูปภาพที่อัปโหลดเสร็จ */}
                {!loading && image && (
                    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                        <Typography variant='body2' color="white">ตัวอย่างรูปภาพ:</Typography>
                        <img src={image} alt="Uploaded Preview" style={{ width: "150px", borderRadius: "8px", marginTop: 5 }} />
                    </Box>
                )}
            </Box>

            <Box display="flex" justifyContent="end" alignItems={"center"} gap={1}>
                <Button size="small" variant='text' sx={{ color: "white", mt: 2, px: 3 }} onClick={onClose}>ยกเลิก</Button>
                <Button
                    size="small"
                    type="submit"
                    sx={{ bgcolor: "primary.main", color: "white", mt: 2, px: 3 }}
                    disabled={loading}
                >
                    บันทึก
                </Button>
            </Box>
        </>
    )
}

export default UploadImage;