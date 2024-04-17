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
      name: string;
      quyen: any;
      soDu: string;
      baiDangUaThich: typeListRealEstate[];
    };
  }
}
