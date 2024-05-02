import { GET } from "@/constant/constants";
import { BASE_URL } from "./config";
import { method } from "lodash";
import { Method } from "axios";
import { Methods } from "./AxiosServices";

// ======== Tài khoản ==========
export const LOGIN = {
  url: BASE_URL + `/quan-ly-tai-khoan/v1/dang-nhap`,
  method: "post",
};

export const REGISTER = {
  url: BASE_URL + "/quan-ly-tai-khoan/v1/dang-ky",
  method: "post",
};

// ========== Real-estate ==========
export const GET_LISTING_SEARCH = {
  key: "/real-estate-listing",
  url: BASE_URL + `/quan-ly-bai-dang/v1/tim-kiem`,
  method: GET,
};

export const POST_ADD_NEW_POST = {
  key: "/dashboard/add-new-post",
  url: BASE_URL + `/quan-ly-bai-dang/bai-dang`,
  method: "post",
};

export const REQUEST_LIST = {
  key: "/dashboard/request-list",
  url: BASE_URL + `/quan-ly-yeu-cau/danh-sach-yeu-cau`,
  method: "get",
};

export const GET_POST_FOR_USER = {
  key: "/dashboard/post-list",
  url: BASE_URL + `/quan-ly-bai-dang/danh-sach-bai-dang`,
  method: "get",
};

export const GET_REQUEST_FOR_USER = {
  key: "/dashboard/request-list",
  url: BASE_URL + `/quan-ly-yeu-cau/danh-sach-yeu-cau`,
  method: "get",
};

export const GET_SIMPLE_POST = {
  url: BASE_URL + `/quan-ly-bai-dang/v1/bai-dang`,
  method: "get" as Methods,
};

// export const GET_LIST_PROPERTY = {
//   key: "/dashboard/properties-list",
//   url: BASE_URL + `/quan-ly-bat-dong-san/danh-sach-bat-dong-san`,
//   method: "get",
// };

export const GET_DETAIL_PROPERTY = {
  key: "/dashboard/properties-detail",
  url: BASE_URL + `/quan-ly-bat-dong-san/v1/bat-dong-san`,
  method: "get",
};

export const CHANGE_PASSWORD = {
  key: "/dashboard/account-settings/password-change",
  url: BASE_URL + `/quan-ly-tai-khoan/doi-mat-khau`,
  method: "post",
};

export const GET_USER_INFO = {
  key: "/dashboard/profile",
  url: BASE_URL + `/quan-ly-nguoi-dung/nguoi-dung`,
  method: "get",
};

export const UPDATE_USER_INFO = {
  key: "/dashboard/profile",
  url: BASE_URL + `/quan-ly-nguoi-dung/nguoi-dung`,
  method: "put",
};

export const POST_SEND_REQUEST = {
  url: BASE_URL + `/quan-ly-yeu-cau/yeu-cau`,
  method: "post",
};

export const ACCEPT_REQUEST = {
  key: "dashboard/request-list",
  url: BASE_URL + `/quan-ly-bat-dong-san/thue-bat-dong-san`,
  method: "put",
};

export const GET_URL_PAYMENT = {
  url: BASE_URL + `/quan-ly-yeu-cau/chi-tiet-yeu-cau`,
  method: "get",
};

export const POST_FAVOURITE = {
  url: BASE_URL + `/quan-ly-ua-thich/ua-thich`,
  method: "post",
};

export const GET_POST_BY_STATUS = {
  url: BASE_URL + "/quan-ly-bai-dang/v1/danh-sach-bai-dang/phan-trang",
  method: "get" as Methods,
};

export const PUT_POST_APPROVE = {
  url: BASE_URL + "/quan-ly-bai-dang/duyet-bai-dang",
  method: "put" as Methods,
};

export const PUT_POST_REJECT = {
  url: BASE_URL + "/quan-ly-bai-dang/tu-choi-bai-dang",
  method: "put" as Methods,
};

export const GET_LIST_ACCOUNTS = {
  key: "dashboard/accounts",
  url: BASE_URL + "/quan-ly-tai-khoan/danh-sach-tai-khoan",
  method: "get" as Methods,
};

export const PUT_PERMISSION_ACCOUNT = {
  url: BASE_URL + "/quan-ly-tai-khoan/cap-quyen-tai-khoan",
  method: "put" as Methods,
};

export const GET_LIST_PAYMENT = {
  url: BASE_URL + `/quan-ly-thanh-toan/danh-sach-thanh-toan-theo-tai-khoan`,
  method: "get" as Methods,
};

export const GET_LIST_PAYMENT_ALL = {
  url: BASE_URL + `/quan-ly-thanh-toan/danh-sach-thanh-toan`,
  method: "get" as Methods,
};

export const GET_LIST_PACKAGE = {
  url: BASE_URL + `/quan-ly-goi/danh-sach-goi`,
  method: "get" as Methods,
};

export const GET_LIST_REPORT = {
  url: BASE_URL + `/quan-ly-bao-cao/danh-sach-bao-cao`,
  method: "get" as Methods,
};
