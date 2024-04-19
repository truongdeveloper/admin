import {
  PUT_PERMISSION_ACCOUNT,
  PUT_POST_APPROVE,
} from "@/common/api/apiEndPoints";
import {
  conversionPermission,
  conversionStatusAccount,
} from "@/constant/conversionAccount";
import { ConfirmModal } from "@/helper/ConfirmModal";
import { Account } from "@/models/common";
import AccountAPI from "@/services/accountsAPI";
import PostAPI from "@/services/postAPI";
import {
  faEye,
  faLock,
  faLockOpen,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
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
import React, { useState } from "react";
import { toast } from "react-toastify";

const permission = [
  { value: "1", label: "Quản trị viên" },
  { value: "2", label: "Cộng tác viên" },
  { value: "3", label: "Người dùng" },
];

const AccountTable = ({
  loadingState,
  dataAccount,
  setReload,
}: {
  loadingState: any;
  dataAccount: any;
  setReload?: any;
}) => {
  const { data } = useSession();
  const [confirmModal, setConfirmModal] = useState(false);
  const [selected, setSelected] = useState<Account | null>(null);
  const [modalDetail, setModalDetail] = useState(false);
  const [modalPermission, setModalPermission] = useState(false);

  const handleChangePermission = (e: any) => {
    const permissionValue = Number(e.target.value);
    new AccountAPI()
      .putPermissionAccount(
        `${PUT_PERMISSION_ACCOUNT.url}?maQuyen=${permissionValue}&maTK=${selected?.id}`
      )
      ?.then((res) => {
        if (res?.id == selected?.id) {
          toast("Phân quyền thành công", {
            type: "success",
          });
          setReload(true);
        } else {
          toast("Phân quyền thất bại!", {
            type: "warning",
          });
        }
      });
    setModalPermission(false);
  };
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableColumn>Mã tài khoản</TableColumn>
          <TableColumn>Tên tài khoản</TableColumn>
          <TableColumn>Số dư</TableColumn>
          <TableColumn>Quyền</TableColumn>
          <TableColumn>Trạng thái</TableColumn>
          <TableColumn>Hành động</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent="Không có dữ liệu"
          loadingContent={<Spinner size="lg" />}
          loadingState={loadingState}
        >
          {!isEmpty(dataAccount)
            ? dataAccount.map((item: Account) => (
                <TableRow key={uniqueId()} className="h-16">
                  <TableCell className="font-[500] text-base">
                    {item.id}
                  </TableCell>
                  <TableCell className="font-semibold text-base">
                    {item.tenTK}
                  </TableCell>

                  <TableCell>
                    <div className="text-slice-3 font-bold ">
                      {item.soDu.toLocaleString("vi-VN")}đ
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        item.maQuyen === 1
                          ? "warning"
                          : item.maQuyen === 2
                          ? "success"
                          : "default"
                      }
                    >
                      <span className="capitalize text-xs">
                        {conversionPermission(item.maQuyen)}
                      </span>
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={item.trangThai === 1 ? "success" : "danger"}
                    >
                      <span className="capitalize text-xs">
                        {conversionStatusAccount(item.trangThai)}
                      </span>
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-5 ">
                      <div>
                        <Tooltip content="Chi tiết">
                          <button onClick={() => console.log("View user")}>
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip content="Phân quyền" color="secondary">
                          <button
                            onClick={() => {
                              setSelected(item);
                              setModalPermission(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        </Tooltip>
                      </div>
                      <div>
                        {item.trangThai === 1 ? (
                          <Tooltip content="Khóa tài khoản" color="danger">
                            <button onClick={() => console.log("Edit user")}>
                              <FontAwesomeIcon icon={faLock} />
                            </button>
                          </Tooltip>
                        ) : (
                          <Tooltip content=" Mở khóa tài khoản" color="success">
                            <button onClick={() => console.log("Edit user")}>
                              <FontAwesomeIcon icon={faLockOpen} />
                            </button>
                          </Tooltip>
                        )}
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
      <Modal
        placement={"top"}
        isOpen={modalPermission}
        onOpenChange={() => setModalPermission(!modalPermission)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <RadioGroup
              label="Chọn phần quyền"
              onChange={handleChangePermission}
              defaultValue={selected?.maQuyen.toString() || "3"}
            >
              <Radio value="1">Quản trị viên</Radio>
              <Radio value="2">Cộng tác viên</Radio>
              <Radio value="3">Người dùng</Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onClick={() => setModalPermission(!modalPermission)}
            >
              Hủy
            </Button>
            <Button color="primary" onClick={handleChangePermission}>
              Phân quyền
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <ModalDetailPost
        isOpen={modalDetail}
        setIsOpen={setModalDetail}
        item={selected}
      /> */}
    </div>
  );
};

export default AccountTable;
