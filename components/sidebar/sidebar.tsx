import React from "react";
import { Sidebar } from "./sidebar.styles";

import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

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
        <div className={Sidebar.Header()}></div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/dashboard"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "dashboard/accounts"}
                title="Quản lý Tài kkhoản"
                icon={<AccountsIcon />}
                href="/dashboard/accounts"
              />
              <SidebarItem
                isActive={pathname === "/payments"}
                title="Thống kê thanh toán"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
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
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Quản lý Bất động sản"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname === "/dashboard/post-management"}
                title="Quản lý bài đăng"
                icon={<ProductsIcon />}
                href="/dashboard/post-management"
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title=" Quản lý Report"
                icon={<ReportsIcon />}
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
