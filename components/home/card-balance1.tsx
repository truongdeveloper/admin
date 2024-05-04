import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Community } from "../icons/community";
import PostAPI from "@/services/postAPI";

export const CardBalance1 = () => {
  const [number, setNumber] = React.useState(0);
  useEffect(() => {
    new PostAPI().getPostListStatus(0, 100, 2)?.then((res) => {
      if (res) {
        setNumber(res.danhSach.length);
      }
    });
  });
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white text-2xl">Tổng bài đăng hoạt động</span>
            <span className="text-white text-xl">{number} bài đăng</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
