import axiosService from "@/common/api/AxiosServices";
import {
  GET_POST_BY_STATUS,
  GET_SIMPLE_POST,
  PUT_POST_APPROVE,
} from "@/common/api/apiEndPoints";

class PostAPI {
  getPostListStatus(page = 0, limit = 20, status = 2) {
    return axiosService({
      url: GET_POST_BY_STATUS.url,
      method: GET_POST_BY_STATUS.method,
      params: {
        trang: page,
        kichThuoc: limit,
        trangThai: status,
      },
    });
  }

  getPostDetail(id: number) {
    return axiosService({
      url: GET_SIMPLE_POST.url,
      method: GET_SIMPLE_POST.method,
      params: {
        maBD: id,
      },
    });
  }

  putPostApprove(url: string) {
    return axiosService({
      url: url ? url : PUT_POST_APPROVE.url,
      method: "put",
    });
  }
}

export default PostAPI;
