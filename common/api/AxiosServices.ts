import queryString from "query-string";
import axios from "axios";
import { toast } from "react-toastify";
import { DELETE, GET, OPTIONS, POST, PUT } from "@/constant/constants";
import { isEmpty } from "lodash";

export type Methods =
  | "head"
  | "options"
  | "put"
  | "post"
  | "patch"
  | "delete"
  | "get";
interface IAxios {
  url: string;
  method?: Methods;
  body?: any;
  headers?: any;
  token?: string;
  params?: object;
}

const axiosService = (props: IAxios) => {
  const { url, method = GET, body, headers, token, params } = props;

  let uri = url;
  if (method == GET && !isEmpty(params)) {
    uri = `${url}?${queryString.stringify(params)}`;
  }

  let headersConfig: any = {
    accept: "application/json",
  };
  if (headers) {
    headersConfig = {
      ...headersConfig,
      ...headers,
    };
  }
  if (token) {
    headersConfig = {
      ...headersConfig,
      Authorization: `Bearer ${token}`,
    };
  }

  // Xử lý yêu cầu POST
  if (method === POST) {
    return axios
      .post(uri, body, { headers: headersConfig })
      .then((res: any) => {
        // if (isEmpty(res.data)) {
        //   toast.error("Lỗi: Danh sách rỗng");
        // }
        return res.data;
      })
      .catch((err: any) => {
        toast.error(`Lôi
        ${err.message}`);
        return err;
      });
  }

  // Xử lý yêu cầu PUT
  if (method === PUT) {
    return axios
      .put(uri, body, { headers: headersConfig })
      .then((res: any) => {
        if (isEmpty(res.data)) {
          toast.error("Lỗi: Danh sách rỗng");
        }
        return res.data;
      })
      .catch((err: any) => {
        toast.error(`Lôi: ${err.message}`);
        return err;
      });
  }

  if (method === GET || method === DELETE || method === OPTIONS) {
    return axios[method](uri, { headers: headersConfig })
      .then((res: any) => {
        if (isEmpty(res.data)) {
          toast.error("Lỗi: Dang sách rỗng");
        }
        return res.data;
      })
      .catch((err: any) => {
        toast.error(`Lôi 
        ${err.message}`);
        return err;
      });
  }
};
export default axiosService;
