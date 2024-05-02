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
import {
  itemListPackage,
  itemListPayment,
  typeListRealEstate,
} from "@/models/common";
import PostAPI from "@/services/postAPI";
import {
  faEye,
  faHandshake,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
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

const PackageTable = ({
  loadingState,
  dataPackage,
  setReload,
}: {
  loadingState: any;
  dataPackage: any;
  setReload?: any;
}) => {
  const { data } = useSession();
  const [confirmModal, setConfirmModal] = useState(false);
  const [selected, setSelected] = useState<itemListPackage | null>(null);
  const [modalDetail, setModalDetail] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  console.log(dataPackage);
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableColumn>Mã gói</TableColumn>
          <TableColumn>Tên gói</TableColumn>
          <TableColumn>Số tiền</TableColumn>
          <TableColumn>Mô tả</TableColumn>
          <TableColumn>Chỉnh sửa</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent="Không có dữ liệu"
          loadingContent={<Spinner size="lg" />}
          loadingState={loadingState}
        >
          {!isEmpty(dataPackage)
            ? dataPackage.map((item: itemListPackage) => (
                <TableRow key={uniqueId()} className="h-20">
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <div className="ps-lg-4 md-pt-10">{item.id}</div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>{item.tenGoi}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold ">
                      {item.soTien.toLocaleString("vi-VN")}đ
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-slice-3">{item.moTa}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-5 ">
                      <div>
                        <Tooltip content="Chỉnh sửa">
                          <button
                            onClick={() => {
                              setSelected(item), setModalDetail(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="pe-2 text-xl"
                            />
                            Chỉnh sửa
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
      {/* <ModalDetailPayment
        isOpen={modalDetail}
        setIsOpen={setModalDetail}
        item={selected}
      /> */}
    </div>
  );
};

export default PackageTable;
