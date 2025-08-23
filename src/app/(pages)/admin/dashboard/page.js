"use client";

import { useState } from "react";
import { Layout, Row, Col, Typography, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import ActivityCard from "../../../../components/ActivityCard";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header collapsed={collapsed} setCollapsed={setCollapsed}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                color: "#3D5753",
                fontFamily: "'Kanit', sans-serif",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              ผู้ดูแลระบบ
            </span>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                backgroundColor: "#3D5753",
                borderColor: "#3D5753",
                borderRadius: "8px",
                padding: "0 16px",
                height: "40px",
                fontFamily: "'Kanit', sans-serif",
                fontWeight: "500",
              }}
            >
              ออกจากระบบ
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px",
            padding: "32px",
            backgroundColor: "#3D5753",
            borderRadius: "16px",
            minHeight: "calc(100vh - 128px)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Title
              level={1}
              style={{
                color: "white",
                marginBottom: "8px",
                fontSize: "36px",
                fontWeight: "bold",
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              แผงควบคุมผู้ดูแลระบบ
            </Title>
            <p
              style={{
                color: "white",
                fontSize: "16px",
                margin: 0,
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              จัดการข้อมูลระบบและผู้ใช้งาน
            </p>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
            {[1, 2, 3, 4].map((item) => (
              <Col xs={24} sm={12} lg={6} key={item}>
                <ActivityCard />
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
