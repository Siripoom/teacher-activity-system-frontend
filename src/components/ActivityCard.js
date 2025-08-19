"use client";

import { Card } from "antd";
import { CalendarOutlined, BankOutlined } from "@ant-design/icons";

export default function ActivityCard({ title, date, department }) {
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        border: "1px solid #f0f0f0",
      }}
      styles={{
        body: {
          padding: "20px",
        },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
      cover={
        <div
          style={{
            height: "200px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "12px",
            margin: "16px 16px 0 16px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.3,
            }}
          />
          {/* Activity icon */}
          <div
            style={{
              fontSize: "48px",
              color: "white",
              opacity: 0.9,
              zIndex: 1,
            }}
          >
            📚
          </div>
        </div>
      }
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontWeight: "600",
            fontSize: "18px",
            marginBottom: "12px",
            fontFamily: "'Kanit', sans-serif",
            color: "#2c3e50",
            lineHeight: "1.4",
            minHeight: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {title || "ชื่อกิจกรรม"}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#6c757d",
            marginBottom: "8px",
            fontFamily: "'Kanit', sans-serif",
            gap: "6px",
          }}
        >
          <BankOutlined style={{ color: "#667eea" }} />
          <span>จัดโดยภาควิชา {department || "วิทยาการคอมพิวเตอร์"}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            color: "#95a5a6",
            fontFamily: "'Kanit', sans-serif",
            gap: "6px",
            backgroundColor: "#f8f9fa",
            padding: "6px 12px",
            borderRadius: "20px",
            margin: "0 auto",
            width: "fit-content",
          }}
        >
          <CalendarOutlined style={{ color: "#667eea" }} />
          <span>{date || "3 พฤษภาคม 2568"}</span>
        </div>
      </div>
    </Card>
  );
}
