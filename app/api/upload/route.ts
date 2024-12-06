import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const file = data.get("file");
    console.log("file:",file)

    const result = await cloudinary.uploader.upload(file as any, {
      folder: "e-commerce-v1",
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
