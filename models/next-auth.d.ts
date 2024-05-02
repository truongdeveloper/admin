import NextAuth from "next-auth";
import { PostBDS } from "../Components/dashboard/add-new-post/AddPropertyBody";
import { typeListRealEstate } from "./common";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      token: string;
      type: string;
      tenTK: string;
      quyen: any;
      anhDaiDien: any;
      taiKhoan: {
        id: number;
        maQuyen: number;
        maNguoiDung: number;
        tenTK: string;
        matKhau: string;
        trangThai: number;
        soDu: number;
      };
      baiDangUaThich: typeListRealEstate[];
    };
  }
}
