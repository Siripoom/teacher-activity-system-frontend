"use client";

import { Layout, Menu, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Sider } = Layout;

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        backgroundColor: "#3D5753",
        minHeight: "100vh",
      }}
      width={200}
      collapsedWidth={80}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "20px",
        }}
      >
        <Image
          src="/logo.png"
          alt="FTE KMUTNB Logo"
          width={collapsed ? 40 : 80}
          height={collapsed ? 40 : 80}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Home Button */}
      <div style={{ padding: "0 16px 16px 16px" }}>
        <Button
          type="text"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            width: "100%",
            height: "40px",
            fontWeight: "bold",
            color: "#3D5753",
            border: "none",
            fontSize: "16px",
            fontFamily: "'Kanit', sans-serif",
          }}
        >
          หน้าหลัก
        </Button>
      </div>
    </Sider>
  );
}
