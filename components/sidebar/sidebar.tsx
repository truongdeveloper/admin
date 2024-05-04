import React from "react";
import { Sidebar } from "./sidebar.styles";

import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import { DevIcon } from "../icons/sidebar/dev-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { data } = useSession();

  const isAdmin = data?.user.quyen[0].authority == "Quản trị viên" || false;
  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div
          className={Sidebar.Header()}
          style={{
            fontWeight: 600,
            fontSize: "30px",
            fontFamily: "Times New Roman, sans-serif",
            justifyContent: "center",
          }}
        >
          HOMY
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Thống kê"
              icon={<HomeIcon />}
              isActive={pathname === "/dashboard"}
              href="/"
            />
            <SidebarMenu title="Quản lý">
              <SidebarItem
                isActive={pathname === "/dashboard/accounts"}
                title="Tài khoản"
                icon={<AccountsIcon />}
                href="/dashboard/accounts"
              />
              {isAdmin && (
                <SidebarItem
                  isActive={pathname === "/dashboard/payment-management"}
                  title="Danh sách thanh toán"
                  icon={<PaymentsIcon />}
                  href="/dashboard/payment-management"
                />
              )}

              <SidebarItem
                isActive={
                  pathname === "/dashboard/post-management/approve-post"
                }
                title="Duyệt bài đăng"
                icon={<ViewIcon />}
                href="/dashboard/post-management/approve-post"
              />
              {isAdmin && (
                <SidebarItem
                  isActive={pathname === "/dashboard/collaborators"}
                  title="Cộng tác viên"
                  icon={<DevIcon />}
                  href="/dashboard/collaborators"
                />
              )}

              {/* <SidebarItem
                isActive={pathname === "/dashboard/post-management"}
                title="Danh sách bài đăng"
                icon={<BalanceIcon />}
                href="/dashboard/post-management"
              /> */}
              {/* <CollapseItems
                icon={<BalanceIcon />}
                items={[
                  {
                    name: "Duyệt bài đăng",
                    link: "/dashboard/post-management/approve-post",
                  },
                  {
                    name: "Danh sách bài đăng",
                    link: "/dashboard/post-management",
                  },
                ]}
                title="Quản lý bài đăng"
                isActive={false}
              /> */}
              {isAdmin && (
                <SidebarItem
                  isActive={pathname === "/dashboard/packages"}
                  title="Gói thanh toán"
                  icon={<CustomersIcon />}
                  href="/dashboard/packages"
                />
              )}

              <SidebarItem
                isActive={pathname === "/dashboard/post-management"}
                title="Bài đăng bất động sản"
                icon={<ProductsIcon />}
                href="/dashboard/post-management"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/reports"}
                title=" Báo cáo vi phạm"
                icon={<ReportsIcon />}
                href="/dashboard/reports"
              />
            </SidebarMenu>

            {/*<SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu> */}
          </div>
          <div className={Sidebar.Footer()}>
            <Button
              color="warning"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
