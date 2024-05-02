import axiosService from "@/common/api/AxiosServices";
import {
  GET_LIST_PACKAGE,
  GET_LIST_PAYMENT,
  GET_LIST_PAYMENT_ALL,
} from "@/common/api/apiEndPoints";

class PackageAPI {
  getListPackage = () => {
    return axiosService({
      url: GET_LIST_PACKAGE.url,
      method: GET_LIST_PACKAGE.method,
    });
  };
}
export default PackageAPI;
