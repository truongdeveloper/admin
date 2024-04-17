"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageBody = () => {
  const [login, setLogin] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (login === true) {
      router.push("/dashboard");
    }
  }, [login, router]);
  return (
    <div>
      <h2 className="text-center" style={{ fontSize: "24px", color: "black" }}>
        Đang kiểm tra đăng nhập....{" "}
      </h2>
    </div>
  );
};
export default PageBody;
