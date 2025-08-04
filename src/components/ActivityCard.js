"use client";

import { Card, Row, Col } from "antd";

export default function ActivityCard({ title, date, image }) {
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
      cover={
        <div
          style={{
            height: "200px",
            backgroundColor: "#3D5753",
            border: "3px solid white",
            borderRadius: "8px",
            margin: "16px",
          }}
        />
      }
    >
      <Card.Meta
        title={
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "8px",
              }}
            >
              {title || "ชื่อกิจกรรม"}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              จัดโดยภาควิชา .................................
            </div>
            <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>
              {date || "3 พฤษภาคม 2568"}
            </div>
          </div>
        }
      />
    </Card>
  );
}
