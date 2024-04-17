"use client";

import Link from "next/link";
import { HouseIcon } from "../../icons/breadcrumb/house-icon";
import { UsersIcon } from "../../icons/breadcrumb/users-icon";
import { Input } from "@nextui-org/react";
import { SettingsIcon } from "../../icons/sidebar/settings-icon";
import { InfoIcon } from "../../icons/accounts/info-icon";
import { DotsIcon } from "../../icons/accounts/dots-icon";
import { AddUser } from "../../accounts/add-user";
import { TableWrapper } from "../../table/table";
import { Select } from "@nextui-org/select";
import { useState } from "react";

import PostAPI from "@/services/postAPI";

const ApprovePostBody = () => {
  const [dataPost, setDataPost] = useState<any>([]);

  new PostAPI().getPostListStatus(0, 20, 1)?.then((res) => {
    console.log(res);
  });
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Dashboard</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <span>Post</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
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
          />
          <SettingsIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex w-full max-w-xs flex-col gap-2"></div>
        {/* <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser />
        </div> */}
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper />
      </div>
    </div>
  );
};
export default ApprovePostBody;
