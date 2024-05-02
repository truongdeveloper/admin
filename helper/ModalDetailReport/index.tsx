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
import { conversionStatusReport } from "@/constant/conversionStatusReport";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import ReportAPI from "@/services/reportAPI";
import { toast } from "react-toastify";

type IModalDetailReport = {
  isOpen: boolean;
  setIsOpen: any;
  item: itemListReport | null;
  setReload?: any;
};

export const ModalDetailReport = ({
  item,
  isOpen,
  setIsOpen,
  setReload,
}: IModalDetailReport) => {
  const toggle = () => setIsOpen(!isOpen);
  const { data } = useSession();

  const handleChangeStatus = () => {
    if (item?.trangThai == 0) {
      new ReportAPI().putProcessReport(item?.id, data?.user.id)?.then((res) => {
        if (res.id == item?.id) {
          toast("Chuyển trạng thái thành công", {
            type: "success",
          });
        } else {
          toast(res, {
            type: "warning",
          });
        }
        setIsOpen(!isOpen);
        setReload(true);
      });
    }
  };

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
                Mã báo cáo: {item?.id}
              </ModalHeader>
              <ModalBody style={{ overflowX: "hidden" }}>
                <>
                  <div className="col-lg-12">
                    <div className="open-email-container pb-40 d-flex flex-column">
                      <div className="email-body divider" style={{ flex: 1 }}>
                        <div className="overflow-x-auto">
                          <table className="w-full table-auto border-collapse border border-gray-200">
                            <tbody>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Mã người report
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.maTK}
                                </td>
                              </tr>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Mã bài đăng
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.maBaiDang}
                                </td>
                              </tr>
                              {!isEmpty(item?.maNguoiXuLy) && (
                                <tr className="h-12">
                                  <td className="font-bold border border-gray-200 px-3">
                                    Người xử lý
                                  </td>
                                  <td className="border border-gray-200 px-3">
                                    {item?.maNguoiXuLy}
                                  </td>
                                </tr>
                              )}

                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Liên hệ
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.email}
                                  {item?.sdt}
                                </td>
                              </tr>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Lý do
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.lyDo}
                                </td>
                              </tr>
                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Mã tài khoản
                                </td>
                                <td className="border border-gray-200 px-3">
                                  {item?.maTK}
                                </td>
                              </tr>

                              <tr className="h-12">
                                <td className="font-bold border border-gray-200 px-3">
                                  Trạng thái
                                </td>
                                <td className="border border-gray-200 px-3">
                                  <Chip
                                    size="sm"
                                    variant="flat"
                                    color={
                                      item?.trangThai == 0
                                        ? "danger"
                                        : "success"
                                    }
                                  >
                                    <span className="capitalize text-xs">
                                      {conversionStatusReport(item?.trangThai)}
                                    </span>
                                  </Chip>
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
              <ModalFooter>
                <Button color="danger" variant="light" onPress={toggle}>
                  Đóng
                </Button>
                {item?.trangThai == 0 && (
                  <Button color="success" onPress={handleChangeStatus}>
                    Đã xử lý
                  </Button>
                )}
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
