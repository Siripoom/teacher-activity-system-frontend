"use client";

import { useState } from "react";
import { Layout, Typography, Table, Tag, Button } from "antd";
import { TeacherSidebar } from "../../../../components/teacher/TeacherSidebar";
import Header from "../../../../components/Header";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;

export default function TeacherActivities() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const columns = [
    {
      title: "ชื่อกิจกรรม",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "เวลา",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "เข้าร่วมแล้ว" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      render: (_, record) => (
        <Button type="primary" size="small">
          {record.status === "เข้าร่วมแล้ว" ? "ดูรายละเอียด" : "เข้าร่วม"}
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "การอบรมเชิงปฏิบัติการ: การสอนออนไลน์",
      date: "2025-08-25",
      time: "09:00 - 16:00",
      status: "รอเข้าร่วม",
    },
    {
      key: "2",
      name: "สัมมนาพัฒนาศักยภาพอาจารย์",
      date: "2025-08-23",
      time: "13:00 - 17:00",
      status: "เข้าร่วมแล้ว",
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
            การเข้าร่วมกิจกรรม
          </Title>
          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    </Layout>
  );
}
