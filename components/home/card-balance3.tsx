import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Community } from "../icons/community";
import ReportAPI from "@/services/reportAPI";
import { itemListReport } from "@/models/common";

export const CardBalance3 = () => {
  const [number, setNumber] = React.useState(0);
  useEffect(() => {
    new ReportAPI().getListReports()?.then((res) => {
      if (res) {
        setNumber(
          res.filter((item: itemListReport) => item.trangThai == 0).length
        );
      }
    });
  });
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white text-2xl">Báo cáo chưa xử lý</span>
            <span className="text-white text-xl">{number} báo cáo</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
