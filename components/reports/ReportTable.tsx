import { ModalDetailReport } from "@/helper/ModalDetailReport";
import { itemListReport } from "@/models/common";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import React, { useState } from "react";

const PaymentTable = ({
  loadingState,
  dataReport,
  setReload,
}: {
  loadingState: any;
  dataReport: any;
  setReload?: any;
}) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [selected, setSelected] = useState<itemListReport | null>(null);
  const [modalDetail, setModalDetail] = useState(false);

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableColumn>Người báo cáo</TableColumn>
          <TableColumn>Liên hệ</TableColumn>
          <TableColumn>Bài đăng</TableColumn>
          <TableColumn>Lý do</TableColumn>
          <TableColumn>Xử lý</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent="Không có báo cáo"
          loadingContent={<Spinner size="lg" />}
          loadingState={loadingState}
        >
          {!isEmpty(dataReport)
            ? dataReport.toReversed().map((item: itemListReport) => (
                <TableRow key={uniqueId()} className="h-16">
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <div className="ps-lg-4 md-pt-10">{item.maTK}</div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className={"flex flex-col"}>
                      <div className="text-gray-500 pb-1">{item.email}</div>
                      <div>{item.sdt}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-slice-3">{item.maBaiDang}</div>
                  </TableCell>
                  <TableCell>
                    <div>{item.lyDo}</div>
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
      <ModalDetailReport
        isOpen={modalDetail}
        setIsOpen={setModalDetail}
        item={selected}
        setReload={setReload}
      />
    </div>
  );
};

export default PaymentTable;
