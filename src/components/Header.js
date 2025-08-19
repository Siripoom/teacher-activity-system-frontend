"use client";

import { Layout, Button, Breadcrumb } from "antd";
import { LoginOutlined, MenuOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header: AntHeader } = Layout;

export default function Header({
  collapsed,
  setCollapsed,
  breadcrumbItems = [],
}) {
  const router = useRouter();
  // Default breadcrumb items if none provided
  const defaultBreadcrumbItems = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>หน้าหลัก</span>
        </>
      ),
    },
  ];

  const allBreadcrumbItems = [...defaultBreadcrumbItems, ...breadcrumbItems];
  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "0 16px",
        height: "80px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            color: "#3D5753",
            border: "none",
            fontSize: "18px",
            flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0, overflow: "hidden", flex: 1 }}>
          <h1
            className="header-title"
            style={{
              color: "#3D5753",
              margin: 0,
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "'Kanit', sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "2px",
              lineHeight: "1.2",
            }}
          >
            ระบบจัดเก็บข้อมูลกิจกรรม
          </h1>

          {/* Breadcrumb */}
          <Breadcrumb
            items={allBreadcrumbItems}
            style={{
              fontSize: "11px",
              fontFamily: "'Kanit', sans-serif",
              margin: 0,
              lineHeight: "1.2",
            }}
            separator=">"
          />
        </div>
      </div>

      <Button
        type="primary"
        icon={<LoginOutlined />}
        style={{
          backgroundColor: "#3D5753",
          borderColor: "#3D5753",
          borderRadius: "8px",
          padding: "0 16px",
          height: "40px",
          fontFamily: "'Kanit', sans-serif",
          fontWeight: "500",
          flexShrink: 0,
          minWidth: "80px",
        }}
        onClick={() => router.push("/login")}
      >
        Login
      </Button>
    </AntHeader>
  );
}
