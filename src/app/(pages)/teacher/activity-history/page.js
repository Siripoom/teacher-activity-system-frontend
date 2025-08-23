"use client";

import { useState } from "react";
import { Layout, Typography, Table, Tag, Button, DatePicker } from "antd";
import { TeacherSidebar } from "../../../../components/teacher/TeacherSidebar";
import Header from "../../../../components/Header";
import { LogoutOutlined, FileSearchOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function ActivityHistory() {
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
      title: "วันที่จัด",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "จำนวนผู้เข้าร่วม",
      dataIndex: "participants",
      key: "participants",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "เสร็จสิ้น" ? "green" : "processing"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<FileSearchOutlined />}
          size="small"
          style={{ backgroundColor: "#3D5753" }}
        >
          ดูรายละเอียด
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "การอบรมเชิงปฏิบัติการ: การสอนออนไลน์",
      date: "2025-08-25",
      participants: 30,
      status: "เสร็จสิ้น",
    },
    {
      key: "2",
      name: "สัมมนาพัฒนาศักยภาพอาจารย์",
      date: "2025-08-23",
      participants: 25,
      status: "กำลังดำเนินการ",
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
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: "24px" 
          }}>
            <Title
              level={2}
              style={{
                margin: 0,
                fontFamily: "'Kanit', sans-serif",
                color: "#3D5753",
              }}
            >
              ประวัติกิจกรรม
            </Title>
            <RangePicker 
              style={{ width: 300 }}
              placeholder={["วันที่เริ่มต้น", "วันที่สิ้นสุด"]}
            />
          </div>
          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    </Layout>
  );
}
