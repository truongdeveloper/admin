"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { Input } from "@nextui-org/input";
import StatisticalAPI from "@/services/statisticalAPI";
import ConnversionStatistion from "@/constant/conversionStatistion";
import PostAPI from "@/services/postAPI";
import Chart, { Props } from "react-apexcharts";
import ConnversionStatistionPayment from "@/constant/conversionStatistionPayment";

const Chart1 = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

type IdataStatistion = { name: string; data: any }[];

export const Content = () => {
  const [year, setYear] = useState(2024);
  const [dataStatistion, setDataStatistion] = useState<IdataStatistion>(
    [] as IdataStatistion
  );
  const [dataStatistionPayment, setDataStatistionPayment] =
    useState<IdataStatistion>([] as IdataStatistion);

  useEffect(() => {
    new StatisticalAPI().getStatistical(year)?.then((res: any) => {
      if (res) {
        setDataStatistion(ConnversionStatistion(res));
      }
    });
    new StatisticalAPI().getStatisticalPayment(year)?.then((res: any) => {
      if (res) {
        setDataStatistionPayment(ConnversionStatistionPayment(res));
      }
    });
  }, [year]);

  const [number, setNumber] = React.useState(0);
  const [number2, setNumber2] = React.useState(0);
  const [number3, setNumber3] = React.useState(0);
  const [number4, setNumber4] = React.useState(0);

  useEffect(() => {
    new PostAPI().getPostListStatus(0, 100, 2)?.then((res) => {
      if (res) {
        setNumber(res.danhSach.length);
      }
    });
    new PostAPI().getPostListStatus(0, 100, 1)?.then((res) => {
      if (res) {
        setNumber2(res.danhSach.length);
      }
    });
    new PostAPI().getPostListStatus(0, 100, 5)?.then((res) => {
      if (res) {
        setNumber3(res.danhSach.length);
      }
    });
    new PostAPI().getPostListStatus(0, 100, 3)?.then((res) => {
      if (res) {
        setNumber4(res.danhSach.length);
      }
    });
  }, []);

  const chartData = {
    series: [number, number2, number3, number4],
    options: {
      labels: ["Đã duyệt", "Chờ duyệt", "Từ chối", "Chờ gia hạn"],
      chart: {
        type: "donut",
      },
    },
  };

  const options = {
    chart: {
      stacked: false,
    },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
    yaxis: [
      {
        title: {
          text: "Số lượng bài đăng",
        },
      },
      {
        opposite: true,
        title: {
          text: "Thành tiền",
        },
      },
    ],
  };

  const series = dataStatistionPayment.map((item) => ({
    name: item.name,
    data: item.data,
    yAxisIndex: item.name === "bài đăng" ? 0 : 1, // Dùng yAxis thứ nhất cho 'bài đăng' và yAxis thứ hai cho 'thành tiền'
  }));
  return (
    <div className="h-full lg:px-6">
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Tổng quan số lượng</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              <CardBalance1 />
              <CardBalance2 />
              <CardBalance3 />
            </div>
          </div>

          {/* Chart */}
          <Input
            label="Năm"
            type="number"
            color="primary"
            labelPlacement="outside"
            defaultValue={year.toString()}
          />
          <div className="h-full w-full flex flex-row gap-2">
            <div className="h-full w-2/3 flex flex-col gap-2">
              <h3 className="text-xl font-semibold">
                Biểu đồ thống kê số lượng bất động sản
              </h3>
              <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                <Chart1 state={dataStatistion.slice(0, 1)} />
              </div>
            </div>
            <div className="w-1/3 z-20">
              <h3 className="text-xl font-semibold">Tỷ lệ duyệt</h3>
              <div id="chart">
                <Chart
                  options={chartData.options as any}
                  series={chartData.series}
                  type="donut"
                  height={425}
                />
              </div>
            </div>
          </div>
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
              Biểu đồ thống kê thanh toán gói
            </h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              <Chart
                options={options}
                series={series}
                type="area"
                height={425}
              />
            </div>
          </div>
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
              Biểu đồ thống kê thanh toán bất động sản
            </h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              <Chart1 state={dataStatistion} />
            </div>
          </div>
        </div>

        {/* Left Section */}
        {/* <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
          <h3 className="text-xl font-semibold">Section</h3>
          <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
            <CardAgents />
            <CardTransactions />
          </div>
        </div> */}
      </div>

      {/* Table Latest Users */}
      {/* <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
        <div className="flex  flex-wrap justify-between">
          <h3 className="text-center text-xl font-semibold">Latest Users</h3>
          <Link
            href="/accounts"
            as={NextLink}
            color="primary"
            className="cursor-pointer"
          >
            View All
          </Link>
        </div>
        <TableWrapper />
      </div> */}
    </div>
  );
};
