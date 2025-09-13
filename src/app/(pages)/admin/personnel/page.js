"use client";

import { useState } from "react";
import { Layout, Typography, Table, Tag, Button, Input, Space } from "antd";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import { LogoutOutlined, SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;

export default function AdminPersonnel() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const columns = [
    {
      title: "รหัสพนักงาน",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "ตำแหน่ง",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "หน่วยงาน",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "สาขา",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ใช้งาน" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small"
            icon={<EditOutlined />}
            style={{
              backgroundColor: "#3D5753",
              borderColor: "#3D5753",
            }}
          >
            แก้ไข
          </Button>
          <Button 
            danger 
            size="small"
            icon={<DeleteOutlined />}
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      employeeId: "T001",
      fullName: "นายสมชาย ใจดี",
      position: "อาจารย์",
      department: "วิศวกรรมคอมพิวเตอร์",
      major: "วิทยาการคอมพิวเตอร์",
      status: "ใช้งาน",
    },
    {
      key: "2",
      employeeId: "T002",
      fullName: "นางสาววรรณา ศรีสุข",
      position: "ผู้ช่วยศาสตราจารย์",
      department: "วิศวกรรมไฟฟ้า",
      major: "วิศวกรรมไฟฟ้า",
      status: "ใช้งาน",
    },
    {
      key: "3",
      employeeId: "A001",
      fullName: "นายธนพล รักเรียน",
      position: "ผู้ดูแลระบบ",
      department: "เทคโนโลยีสารสนเทศ",
      major: "เทคโนโลยีสารสนเทศ",
      status: "ใช้งาน",
    },
  ];

  const filteredData = data.filter(item =>
    item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.employeeId.toLowerCase().includes(searchText.toLowerCase()) ||
    item.department.toLowerCase().includes(searchText.toLowerCase())
  );

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
              title: "บุคคลากร",
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <Title
              level={2}
              style={{
                margin: 0,
                fontFamily: "'Kanit', sans-serif",
                color: "#3D5753",
              }}
            >
              จัดการบุคคลากร
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                backgroundColor: "#3D5753",
                borderColor: "#3D5753",
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              เพิ่มบุคคลากร
            </Button>
          </div>
          
          <div style={{ marginBottom: "16px" }}>
            <Input
              placeholder="ค้นหาบุคคลากร (ชื่อ, รหัสพนักงาน, หน่วยงาน)"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: "400px" }}
            />
          </div>
          
          <Table 
            columns={columns} 
            dataSource={filteredData}
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