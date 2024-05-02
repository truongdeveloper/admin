import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SliderImage from "../SliderImage";
import { typeListRealEstate } from "@/models/common";
import conversionNumberToPrice from "@/constant/conversionNumberToPrice";

type IModalDetailPost = {
  isOpen: boolean;
  setIsOpen: any;
  item: typeListRealEstate | null;
};

export const ModalDetailPost = ({
  item,
  isOpen,
  setIsOpen,
}: IModalDetailPost) => {
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <>
        <Modal
          isOpen={isOpen}
          placement="center"
          onOpenChange={toggle}
          scrollBehavior="inside"
          size="4xl"
          style={{ overflowX: "hidden" }}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                {item?.tieuDe}
              </ModalHeader>
              <ModalBody style={{ overflowX: "hidden" }}>
                <>
                  <div className="col-lg-12">
                    <div className="open-email-container pb-40 d-flex flex-column">
                      <div className="email-body divider" style={{ flex: 1 }}>
                        <SliderImage
                          imageList={item?.batDongSan?.hinhAnhList as any}
                        />
                        <div className="py-3 px-4">
                          <p>{item?.noiDung}</p>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full table-auto border-collapse border border-gray-200">
                            <tbody>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Tên BDS:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.tenBDS}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Loại BDS:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.loaiBDS.tenLoaiBDS}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Diện tích:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.dienTich}m<sup>2</sup>
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Giá thuê:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {conversionNumberToPrice(
                                    item?.batDongSan?.giaThue
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Địa chỉ:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.diaChi}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Phòng ngủ:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.phongNgu}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Phòng tắm:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.phongTam}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Phòng bếp:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.phongBep}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Số tầng:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.soTang}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-bold border border-gray-200 px-3">
                                  Năm xây dựng:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.namXayDung}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="font-bold border border-gray-200 px-3"
                                  style={{ minWidth: "100px" }}
                                >
                                  Mô tả:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.batDongSan?.moTa}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
