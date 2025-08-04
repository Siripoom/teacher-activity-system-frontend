"use client";

import { Layout, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "0 32px",
        height: "80px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "0 0 16px 16px",
        margin: "0 24px 0 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div>
          <h1
            style={{
              color: "#3D5753",
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            ระบบจัดเก็บข้อมูลกิจกรรม
          </h1>
          <div
            style={{
              color: "#666",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            <span>🏠</span>
            <span>/</span>
            <span>หน้าหลัก</span>
          </div>
        </div>
      </div>

      <Button
        type="primary"
        icon={<LoginOutlined />}
        style={{
          backgroundColor: "#3D5753",
          borderColor: "#3D5753",
          borderRadius: "8px",
          padding: "0 20px",
          height: "40px",
          fontFamily: "'Kanit', sans-serif",
          fontWeight: "500",
        }}
      >
        Login
      </Button>
    </AntHeader>
  );
}
