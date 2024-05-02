"use client";

import Link from "next/link";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { Input } from "@nextui-org/input";

import { Slider, SliderValue } from "@nextui-org/slider";
import { debounce } from "lodash";
import { Pagination } from "@nextui-org/pagination";
import { itemListPayment, itemListReport } from "@/models/common";
import { useEffect, useState } from "react";
import ReportAPI from "@/services/reportAPI";
import { Button, ButtonGroup } from "@nextui-org/button";
import ReportTable from "./ReportTable";

const ReportsBody = () => {
  const [originalDataList, setOriginalDataList] = useState<any>([]);
  const [dataList, setDataList] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [loadingState, setLoadingState] = useState<any>("loading");
  const [limit, setLimit] = useState<SliderValue>(10);

  const [status, setStatus] = useState(0);

  const handleChangeStatus = (status: number) => {
    const filteredPosts = originalDataList.filter(
      (post: itemListReport) => post.trangThai == status
    );
    setDataList(filteredPosts);
    setStatus(status);
  };

  const handlePageChange = (page: number) => {
    setLoadingState("loading");
    setCurrentPage(page);
  };

  useEffect(() => {
    new ReportAPI()
      .getListReports()
      ?.then((res: any) => {
        setLoadingState("idle");
        setTotalPage(res?.tongSoTrang);
        setOriginalDataList(res as itemListPayment[]);
        setDataList(res as itemListPayment[]);
      })
      .finally(() => {
        setReload(false);
      });
  }, [currentPage, reload, limit]);

  const handleSearchChange = (e: any) => {
    const searchString = e.target.value?.toLowerCase();
    const filteredPosts = originalDataList.filter((post: itemListPayment) =>
      post.id.toString().toLowerCase().includes(searchString)
    );
    setDataList(filteredPosts);
  };

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Quản trị</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <span>Báo cáo</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Danh sách báo cáo</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Tìm kiếm"
            variant="bordered"
            onChange={handleSearchChange}
          />
          <ButtonGroup>
            <Button
              onClick={() => handleChangeStatus(1)}
              color={status == 1 ? "primary" : "default"}
              className="font-[600]"
            >
              Đã xử lý
            </Button>
            <Button
              onClick={() => handleChangeStatus(0)}
              color={status == 0 ? "primary" : "default"}
              className="font-[600]"
            >
              Chưa xử lý
            </Button>
          </ButtonGroup>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-2"></div>
        <Slider
          size="sm"
          step={5}
          color="foreground"
          label="Số lượng 1 trang"
          showSteps={true}
          maxValue={50}
          minValue={5}
          onChange={debounce(setLimit, 300)}
          defaultValue={limit}
          className="min-w-32 max-w-48"
        />
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <ReportTable
          setReload={setReload}
          dataReport={dataList}
          loadingState={loadingState}
        />
        <Pagination
          total={totalPage}
          className="mt-4 flex justify-center"
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
          showControls
        />
      </div>
    </div>
  );
};
export default ReportsBody;
