"use client";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PageBody = () => {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user.quyen[0].authority !== "Người dùng") {
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        router.push("/login");
      }
    });
  }, [router]);
  return (
    <div>
      <h2 className="text-center" style={{ fontSize: "24px", color: "black" }}>
        Đang kiểm tra đăng nhập....{" "}
      </h2>
    </div>
  );
};
export default PageBody;
