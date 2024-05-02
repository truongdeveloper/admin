"use client";

import Link from "next/link";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { Input } from "@nextui-org/input";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { InfoIcon } from "../icons/accounts/info-icon";
import { DotsIcon } from "../icons/accounts/dots-icon";
import PostTable from "./PostTable";
import { Slider, SliderValue } from "@nextui-org/slider";
import { debounce } from "lodash";
import { Pagination } from "@nextui-org/pagination";
import { typeListRealEstate } from "@/models/common";
import { useEffect, useState } from "react";
import PostAPI from "@/services/postAPI";

const PostManagementBody = () => {
  const [originalDataPost, setOriginalDataPost] = useState<any>([]);
  const [dataPost, setDataPost] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [loadingState, setLoadingState] = useState<any>("loading");
  const [limit, setLimit] = useState<SliderValue>(10);

  const STATUS = 2;

  const handlePageChange = (page: number) => {
    setLoadingState("loading");
    setCurrentPage(page);
  };

  useEffect(() => {
    new PostAPI()
      .getPostListStatus(currentPage - 1, limit as number, STATUS)
      ?.then((res: any) => {
        setLoadingState("idle");
        setTotalPage(res.tongSoTrang);
        setOriginalDataPost(res.danhSach as typeListRealEstate[]);
        setDataPost(res.danhSach as typeListRealEstate[]);
      })
      .finally(() => {
        setReload(false);
      });
  }, [currentPage, reload, limit]);

  const handleSearchChange = (e: any) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    const filteredPosts = originalDataPost.filter((post: typeListRealEstate) =>
      post.tieuDe.toLowerCase().includes(searchString)
    );
    setDataPost(filteredPosts);
  };

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
            onChange={handleSearchChange}
          />
          <SettingsIcon />
          <InfoIcon />
          <DotsIcon />
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
        <PostTable
          setReload={setReload}
          dataPost={dataPost}
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
export default PostManagementBody;
