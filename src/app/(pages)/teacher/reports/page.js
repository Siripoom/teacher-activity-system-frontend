"use client";

import { useState } from "react";
import { Layout, Typography, Card, Button, Row, Col } from "antd";
import { TeacherSidebar } from "../../../../components/teacher/TeacherSidebar";
import Header from "../../../../components/Header";
import { LogoutOutlined, PrinterOutlined, DownloadOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;

export default function TeacherReports() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const reports = [
    {
      title: "รายงานสรุปกิจกรรมประจำเดือน",
      description: "รายงานสรุปการเข้าร่วมกิจกรรมทั้งหมดในแต่ละเดือน",
      icon: <PrinterOutlined style={{ fontSize: "24px" }} />,
    },
    {
      title: "รายงานชั่วโมงกิจกรรม",
      description: "สรุปจำนวนชั่วโมงการเข้าร่วมกิจกรรมทั้งหมด",
      icon: <PrinterOutlined style={{ fontSize: "24px" }} />,
    },
    {
      title: "รายงานกิจกรรมที่จัด",
      description: "รายงานกิจกรรมที่คุณเป็นผู้จัดทั้งหมด",
      icon: <PrinterOutlined style={{ fontSize: "24px" }} />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <TeacherSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
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
              อาจารย์
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
            backgroundColor: "white",
            borderRadius: "16px",
            minHeight: "calc(100vh - 128px)",
          }}
        >
          <Title
            level={2}
            style={{
              marginBottom: "24px",
              fontFamily: "'Kanit', sans-serif",
              color: "#3D5753",
            }}
          >
            พิมพ์รายงาน
          </Title>

          <Row gutter={[24, 24]}>
            {reports.map((report, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: "12px",
                  }}
                >
                  <div style={{ textAlign: "center", marginBottom: "16px" }}>
                    {report.icon}
                  </div>
                  <Title
                    level={4}
                    style={{
                      marginBottom: "8px",
                      textAlign: "center",
                      fontFamily: "'Kanit', sans-serif",
                    }}
                  >
                    {report.title}
                  </Title>
                  <p
                    style={{
                      color: "rgba(0, 0, 0, 0.45)",
                      textAlign: "center",
                      marginBottom: "16px",
                    }}
                  >
                    {report.description}
                  </p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                      type="primary"
                      icon={<PrinterOutlined />}
                      style={{ flex: 1, backgroundColor: "#3D5753" }}
                    >
                      พิมพ์
                    </Button>
                    <Button
                      icon={<DownloadOutlined />}
                      style={{ flex: 1 }}
                    >
                      ดาวน์โหลด PDF
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
