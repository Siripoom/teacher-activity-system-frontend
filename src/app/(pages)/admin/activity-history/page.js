"use client";

import { useState } from "react";
import { Layout, Typography, Table, Tag, Button, DatePicker } from "antd";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import { LogoutOutlined, FileSearchOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function AdminActivityHistory() {
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
      title: "เวลา",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "ผู้เข้าร่วม",
      dataIndex: "participants",
      key: "participants",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "เสร็จสิ้น" ? "green" : status === "กำลังดำเนินการ" ? "blue" : "red"}>
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
          size="small"
          icon={<FileSearchOutlined />}
          style={{
            backgroundColor: "#3D5753",
            borderColor: "#3D5753",
          }}
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
      date: "2025-07-25",
      time: "09:00 - 16:00",
      participants: 45,
      status: "เสร็จสิ้น",
    },
    {
      key: "2",
      name: "สัมมนาพัฒนาศักยภาพอาจารย์",
      date: "2025-07-23",
      time: "13:00 - 17:00",
      participants: 32,
      status: "เสร็จสิ้น",
    },
    {
      key: "3",
      name: "การประชุมคณะกรรมการพัฒนาหลักสูตร",
      date: "2025-07-20",
      time: "14:00 - 16:00",
      participants: 15,
      status: "เสร็จสิ้น",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header 
          collapsed={collapsed} 
          setCollapsed={setCollapsed}
          breadcrumbItems={[
            {
              title: "แผงควบคุมผู้ดูแลระบบ",
              href: "/admin/dashboard",
            },
            {
              title: "ประวัติกิจกรรม",
            },
          ]}
        >
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
            ประวัติกิจกรรม
          </Title>
          
          <div style={{ marginBottom: "16px" }}>
            <RangePicker placeholder={["วันที่เริ่มต้น", "วันที่สิ้นสุด"]} />
          </div>
          
          <Table 
            columns={columns} 
            dataSource={data}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} จาก ${total} รายการ`,
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}