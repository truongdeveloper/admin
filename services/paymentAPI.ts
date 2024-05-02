import axiosService from "@/common/api/AxiosServices";
import {
  GET_LIST_PAYMENT,
  GET_LIST_PAYMENT_ALL,
} from "@/common/api/apiEndPoints";

class PaymentAPI {
  getListPaymentById = (accountId: number | undefined) => {
    return axiosService({
      url: GET_LIST_PAYMENT.url,
      method: GET_LIST_PAYMENT.method,
      params: {
        maTK: accountId,
      },
    });
  };

  getListPayment = (page?: number, limit?: number, status?: number) => {
    return axiosService({
      url: GET_LIST_PAYMENT_ALL.url,
      method: GET_LIST_PAYMENT_ALL.method,
    });
  };
}
export default PaymentAPI;
