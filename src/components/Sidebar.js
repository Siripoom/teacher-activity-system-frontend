"use client";

import { Layout, Button } from "antd";
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
          {collapsed ? "หน้า" : "หน้าหลัก"}
        </Button>
      </div>
    </Sider>
  );
}
