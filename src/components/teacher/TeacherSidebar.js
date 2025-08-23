"use client";

import { Layout, Button, Menu } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  HomeOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  PrinterOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export function TeacherSidebar({ collapsed, setCollapsed }) {
  const router = useRouter();

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "หน้าหลัก",
      onClick: () => router.push("/teacher/dashboard"),
    },
    {
      key: "activities",
      icon: <CalendarOutlined />,
      label: "การเข้าร่วมกิจกรรม",
      onClick: () => router.push("/teacher/activities"),
    },
    {
      key: "create-activity",
      icon: <PlusCircleOutlined />,
      label: "เพิ่มกิจกรรม",
      onClick: () => router.push("/teacher/create-activity"),
    },
    {
      key: "activity-history",
      icon: <HistoryOutlined />,
      label: "ประวัติกิจกรรม",
      onClick: () => router.push("/teacher/activity-history"),
    },
    {
      key: "reports",
      icon: <PrinterOutlined />,
      label: "พิมพ์รายงาน",
      onClick: () => router.push("/teacher/reports"),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        backgroundColor: "#3D5753",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        transition: "all 0.2s",
      }}
      width={200}
      collapsedWidth={80}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: collapsed ? "15px" : "15px 10px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            width: collapsed ? 75 : 180,
            height: collapsed ? 75 : 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <Image
            src="/logo.png"
            alt="KMUTNB Logo"
            width={collapsed ? 65 : 160}
            height={collapsed ? 65 : 140}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Menu Items */}
      <Menu
        theme="dark"
        mode="inline"
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
        items={menuItems}
      />
    </Sider>
  );
}
