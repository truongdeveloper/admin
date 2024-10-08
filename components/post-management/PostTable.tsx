import { PUT_POST_APPROVE } from "@/common/api/apiEndPoints";
import { getNameOfProvince } from "@/constant/conversionAdress";
import transformPriceToString from "@/constant/conversionNumberToPrice";
import { ConfirmModal } from "@/helper/ConfirmModal";
import { ModalDetailPost } from "@/helper/ModalDetailPost";
import { typeListRealEstate } from "@/models/common";
import PostAPI from "@/services/postAPI";
import { faEye, faHandshake, faTrash } from "@fortawesome/free-solid-svg-icons";
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
  User,
} from "@nextui-org/react";
import { isEmpty, uniqueId } from "lodash";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PostTable = ({
  loadingState,
  dataPost,
  setReload,
}: {
  loadingState: any;
  dataPost: any;
  setReload?: any;
}) => {
  const { data } = useSession();
  const [confirmModal, setConfirmModal] = useState(false);
  const [selected, setSelected] = useState<typeListRealEstate | null>(null);
  const [modalDetail, setModalDetail] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const handleDeletePost = () => {
    new PostAPI().putDeletePost(selected?.id, data?.user.id)?.then((res) => {
      if (res.id == selected?.id) {
        toast("Ẩn bài đăng thành công", {
          type: "success",
        });
        setReload(true);
      } else {
        toast("Ẩn bài thất bại!", {
          type: "warning",
        });
      }
    });
    setConfirmModal(false);
  };

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableColumn>Bài đăng</TableColumn>
          <TableColumn>Diện tích</TableColumn>
          <TableColumn>Nội dung</TableColumn>
          <TableColumn>Hành động</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent="Không có dữ liệu"
          loadingContent={<Spinner size="lg" />}
          loadingState={loadingState}
        >
          {!isEmpty(dataPost)
            ? dataPost.map((item: typeListRealEstate) => (
                <TableRow key={uniqueId()}>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      {item.batDongSan?.hinhAnhList[0].url ? (
                        <Image
                          src={item.batDongSan.hinhAnhList[0].url}
                          alt=""
                          width={120}
                          height={120}
                          className="image-row"
                          style={{
                            objectFit: "cover",
                            height: "120px",
                            width: "120px",
                          }}
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = "https://picsum.photos/200";
                          }}
                        />
                      ) : (
                        <Image
                          src={"https://picsum.photos/200"}
                          alt="Landscape picture"
                          width={120}
                          height={120}
                          className="p-img"
                        />
                      )}
                      <div className="ps-lg-4 md-pt-10 min-w-14 max-w-64 ">
                        <button
                          className="hover:text-orange-500 font-[500] text-[16px] text-left"
                          onClick={() => {
                            setSelected(item);
                            setModalDetail(true);
                          }}
                        >
                          {item.tieuDe}
                        </button>
                        <div className="address mt-2">
                          {/* {districtName},{" "} */}
                          {getNameOfProvince(item.batDongSan.viTri.tinhTp)}
                        </div>
                        <strong className="font-[500] text-danger">
                          {transformPriceToString(item.batDongSan.giaThue)}
                        </strong>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-danger">
                      {item.batDongSan.dienTich} m²
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-slice-3">{item.noiDung}</div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-5 ">
                      <div className="flex gap-5">
                        <Tooltip content="Chi tiết">
                          <button
                            onClick={() => {
                              setSelected(item), setModalDetail(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Tooltip>
                        <Tooltip content="Ẩn bài" color="danger">
                          <button
                            onClick={() => {
                              setSelected(item), setConfirmModal(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </Tooltip>
                      </div>
                      {/* <div>
                        <Tooltip content="Phân quyền" color="secondary">
                          <button
                            onClick={() => {
                              setSelected(item);
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
                      </div> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      <ConfirmModal
        isOpen={confirmModal}
        setIsOpen={setConfirmModal}
        title="Ẩn bài đăng này khỏi hệ thống"
        content="Bài đăng sẽ ẩn khỏi hệ thống và người dùng không thể tìm kiếm"
        icon={<FontAwesomeIcon icon={faHandshake} style={{ color: "red" }} />}
        onConfirm={handleDeletePost}
      />
      <ModalDetailPost
        isOpen={modalDetail}
        setIsOpen={setModalDetail}
        item={selected}
      />
    </div>
  );
};

export default PostTable;
