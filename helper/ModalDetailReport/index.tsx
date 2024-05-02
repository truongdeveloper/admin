import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import {
  itemListPayment,
  itemListReport,
  typeListRealEstate,
} from "@/models/common";
import conversionNumberToPrice from "@/constant/conversionNumberToPrice";
import { isEmpty } from "lodash";
import {
  conversionStatusPayment,
  conversionTypePayment,
} from "@/constant/conversionStatusPayment";
import conversionDate from "@/constant/conversionDate";

type IModalDetailReport = {
  isOpen: boolean;
  setIsOpen: any;
  item: itemListReport | null;
};

export const ModalDetailReport = ({
  item,
  isOpen,
  setIsOpen,
}: IModalDetailReport) => {
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <>
        <Modal
          isOpen={isOpen}
          placement="center"
          onOpenChange={toggle}
          scrollBehavior="inside"
          size="3xl"
          style={{ overflowX: "hidden" }}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Giao dịch mã: {item?.id}
              </ModalHeader>
              <ModalBody style={{ overflowX: "hidden" }}>
                <>
                  <div className="col-lg-12">
                    <div className="open-email-container pb-40 d-flex flex-column">
                      <div className="email-body divider" style={{ flex: 1 }}>
                        <div className="overflow-x-auto">
                          {/* <table className="w-full table-auto border-collapse border border-gray-200">
                            <tbody>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Tên BDS:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {conversionTypePayment(item?.loaiThanhToan)}
                                </td>
                              </tr>
                              {!isEmpty(item?.maBD) && (
                                <tr className="h-12">
                                  <td className="font-bold border border-gray-200 px-3">
                                    Loại BDS:
                                  </td>
                                  <td className="border border-gray-200 px-3">
                                    {item?.maBD}
                                  </td>
                                </tr>
                              )}

                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Mã giao dịch VnPay:
                                </td>
                                <td className="border font-bold border-gray-200 px-3">
                                  {item?.maGiaoDich}
                                </td>
                              </tr>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Mã gói:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.maGoi}
                                </td>
                              </tr>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Mã tài khoản:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.maTK}
                                </td>
                              </tr>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Thời gian:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {conversionDate(item?.thoiGian).formattedDate}
                                </td>
                              </tr>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Trạng thái:
                                </td>
                                <td className="border border-gray-200 px-3">
                                  <Chip
                                    size="sm"
                                    variant="flat"
                                    color={
                                      item?.trangThai?.trim() != "00"
                                        ? "danger"
                                        : "success"
                                    }
                                  >
                                    <span className="capitalize text-xs">
                                      {conversionStatusPayment(item?.trangThai)}
                                    </span>
                                  </Chip>
                                </td>
                              </tr>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Số tiền:
                                </td>
                                <td className="border border-gray-200 px-3  font-bold">
                                  {item?.tongTien.toLocaleString("vi-VN")}đ
                                </td>
                              </tr>
                            </tbody>
                          </table> */}
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
