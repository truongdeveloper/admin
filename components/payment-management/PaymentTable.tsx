import { GET_SIMPLE_POST, PUT_POST_APPROVE } from "@/common/api/apiEndPoints";
import { getNameOfProvince } from "@/constant/conversionAdress";
import conversionDate from "@/constant/conversionDate";
import transformPriceToString from "@/constant/conversionNumberToPrice";
import {
  conversionStatusPayment,
  conversionTypePayment,
} from "@/constant/conversionStatusPayment";
import timeAgo from "@/constant/conversionTime";
import { ConfirmModal } from "@/helper/ConfirmModal";
import { ModalDetailPayment } from "@/helper/ModalDetailPayment";
import { ModalDetailPost } from "@/helper/ModalDetailPost";
import { itemListPayment, typeListRealEstate } from "@/models/common";
import PostAPI from "@/services/postAPI";
import { faEye, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { isEmpty, uniqueId } from "lodash";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PaymentTable = ({
  loadingState,
  dataPayment,
  setReload,
}: {
  loadingState: any;
  dataPayment: any;
  setReload?: any;
}) => {
  const { data } = useSession();
  const [confirmModal, setConfirmModal] = useState(false);
  const [selected, setSelected] = useState<itemListPayment | null>(null);
  const [modalDetail, setModalDetail] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableColumn>Mã thanh toán</TableColumn>
          <TableColumn>Loại thanh toán</TableColumn>
          <TableColumn>Số tiền</TableColumn>
          <TableColumn>Trạng thái</TableColumn>
          <TableColumn>Chi tiết</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent="Không có dữ liệu"
          loadingContent={<Spinner size="lg" />}
          loadingState={loadingState}
        >
          {!isEmpty(dataPayment)
            ? dataPayment.toReversed().map((item: itemListPayment) => (
                <TableRow key={uniqueId()} className="h-16">
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <div className="ps-lg-4 md-pt-10">{item.id}</div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div
                      className={` font-[500]
                        ${
                          item.loaiThanhToan == 1
                            ? "text-danger-400"
                            : "text-success-600"
                        }`}
                    >
                      {conversionTypePayment(item.loaiThanhToan)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-slice-3">
                      {conversionDate(item.thoiGian).formattedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        item.trangThai?.trim() != "00" ? "danger" : "success"
                      }
                    >
                      <span className="capitalize text-xs">
                        {conversionStatusPayment(item.trangThai)}
                      </span>
                    </Chip>
                    <div className="text-slice-3"></div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-5 ">
                      <div>
                        <Tooltip content="Chi tiết">
                          <button
                            onClick={() => {
                              setSelected(item), setModalDetail(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} className="pe-2" />
                            Chi tiết
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {/* <ConfirmModal
        isOpen={confirmModal}
        setIsOpen={setConfirmModal}
        title="Duyệt bài đăng này"
        content="Bài đăng sẽ được tìm kiếm ở công khai"
        icon={<FontAwesomeIcon icon={faHandshake} style={{ color: "green" }} />}
        onConfirm={handleApprovePost}
      /> */}
      <ModalDetailPayment
        isOpen={modalDetail}
        setIsOpen={setModalDetail}
        item={selected}
      />
    </div>
  );
};

export default PaymentTable;
