import axiosService from "@/common/api/AxiosServices";
import { GET_LIST_REPORT, PUT_PROCESS_REPORT } from "@/common/api/apiEndPoints";

class ReportAPI {
  getListReports = () => {
    return axiosService({
      url: GET_LIST_REPORT.url,
      method: GET_LIST_REPORT.method,
    });
  };

  putProcessReport = (
    reportId: number | undefined,
    accountId: number | undefined
  ) => {
    return axiosService({
      url: PUT_PROCESS_REPORT.url,
      method: PUT_PROCESS_REPORT.method,
      body: {
        maReport: reportId,
        maNguoiXuLy: accountId,
      },
    });
  };
}
export default ReportAPI;
