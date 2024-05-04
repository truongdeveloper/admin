import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Community } from "../icons/community";
import AccountAPI from "@/services/accountsAPI";

export const CardBalance2 = () => {
  const [number, setNumber] = React.useState(0);
  useEffect(() => {
    new AccountAPI().getListAccounts(0, 100)?.then((res) => {
      if (res) {
        setNumber(res.length);
      }
    });
  });
  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-black text-2xl">Tổng tài khoản</span>
            <span className="text-black text-xl">{number} tài khoản</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
