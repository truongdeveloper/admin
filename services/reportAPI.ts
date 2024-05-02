import axiosService from "@/common/api/AxiosServices";
import { GET_LIST_REPORT } from "@/common/api/apiEndPoints";

class ReportAPI {
  getListReports = () => {
    return axiosService({
      url: GET_LIST_REPORT.url,
      method: GET_LIST_REPORT.method,
    });
  };
}
export default ReportAPI;
