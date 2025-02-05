"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // ใช้ default CSS ของ NProgress
import { GlobalStyles } from "@mui/system";

NProgress.configure({ showSpinner: false }); // ปิดวงกลมตรงกลาง

export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 500); // กันไม่ให้โหลดค้าง

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return (
    <GlobalStyles
      styles={{
        "#nprogress .bar": {
          background: "#1976D2", // สีของแถบโหลด (เปลี่ยนได้)
          height: "3px", // ความสูงของแถบ
        },
      }}
    />
  );
}
