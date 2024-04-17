import axiosService from "@/common/api/AxiosServices";
import {
  GET_LIST_ACCOUNTS,
  PUT_PERMISSION_ACCOUNT,
} from "@/common/api/apiEndPoints";

class AccountAPI {
  getListAccounts(page = 0, limit = 20) {
    return axiosService({
      url: GET_LIST_ACCOUNTS.url,
      method: GET_LIST_ACCOUNTS.method,
      params: {
        trang: page,
        kichThuoc: limit,
      },
    });
  }
  putPermissionAccount(url: string) {
    return axiosService({
      url: url ? url : PUT_PERMISSION_ACCOUNT.url,
      method: PUT_PERMISSION_ACCOUNT.method,
    });
  }
}

export default AccountAPI;
