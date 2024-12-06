"use server";
import { readFileSync, writeFileSync, existsSync } from "fs";

function writeFileSyncLib(path: string, data: any[]) {
  try {
    if (!Array.isArray(data)) {
        Array(data)
    }

    // ตรวจสอบว่ามีไฟล์อยู่หรือไม่
    const oldData = existsSync(path)
      ? (() => {
          const fileContent = readFileSync(path, "utf-8") || "[]"; // อ่านข้อมูลจากไฟล์
          const parsedData = JSON.parse(fileContent);

          return Array.isArray(parsedData) ? parsedData : []; // ตรวจสอบว่าเป็น Array
        })()
      : [];

    // รวมข้อมูลเก่าและใหม่
    const mergedData = [...oldData, ...data];

    // เขียนข้อมูลใหม่ลงไฟล์
    writeFileSync(path, JSON.stringify(mergedData, null, 2), "utf-8");
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
  }
}

export default writeFileSyncLib;
