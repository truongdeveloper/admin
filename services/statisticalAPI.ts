import axiosService from "@/common/api/AxiosServices";
import {
  GET_STATISTICAL,
  GET_STATISTICAL_PAYMENT,
} from "@/common/api/apiEndPoints";

class StatisticalAPI {
  getStatistical(year: number) {
    return axiosService({
      url: GET_STATISTICAL.url + year,
      method: GET_STATISTICAL.method,
    });
  }

  getStatisticalPayment(year: number) {
    return axiosService({
      url: GET_STATISTICAL_PAYMENT.url + year,
      method: GET_STATISTICAL_PAYMENT.method,
    });
  }
}

export default StatisticalAPI;
