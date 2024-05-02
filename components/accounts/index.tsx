"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { TableWrapper } from "@/components/table/table";
import { AddUser } from "./add-user";
import { Pagination } from "@nextui-org/pagination";
import { debounce } from "lodash";
import { Slider, SliderValue } from "@nextui-org/slider";
import { Account, typeListRealEstate } from "@/models/common";

import AccountTable from "./AccountTable";
import AccountAPI from "@/services/accountsAPI";

export const Accounts = () => {
  const [originalDataAccount, setOriginalDataAccount] = useState<any>([]);
  const [dataAccount, setDataAccount] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [loadingState, setLoadingState] = useState<any>("loading");
  const [limit, setLimit] = useState<SliderValue>(10);

  const handlePageChange = (page: number) => {
    setLoadingState("loading");
    setCurrentPage(page);
  };

  useEffect(() => {
    new AccountAPI()
      .getListAccounts(currentPage - 1, limit as number)
      ?.then((res: any) => {
        setLoadingState("idle");
        setTotalPage(res.tongSoTrang);
        setOriginalDataAccount(res as Account[]);
        setDataAccount(res as Account[]);
      })
      .finally(() => {
        setReload(false);
      });
  }, [currentPage, reload, limit]);
  console.log(dataAccount);

  const handleSearchChange = (e: any) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    const filteredAccounts = originalDataAccount.filter((account: Account) =>
      account.tenTK.toLowerCase().includes(searchString)
    );
    setDataAccount(filteredAccounts);
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
          <span>Tài khoản</span>
          {/* <span> / </span>{" "} */}
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Duyệt bài đăng</h3>
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
          <SettingsIcon />
          <InfoIcon />
          <DotsIcon />
          <AddUser />
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
        <AccountTable
          setReload={setReload}
          dataAccount={dataAccount}
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
