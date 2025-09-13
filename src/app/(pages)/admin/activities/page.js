"use client";

import { useState } from "react";
import { Layout, Typography, Button, Table } from "antd";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import SearchBar from "../../../../components/SearchBar";
import { LogoutOutlined, EyeOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;

export default function AdminActivities() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [department, setDepartment] = useState("all");
  const [major, setMajor] = useState("all");
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const allData = [
    {
      key: "1",
      id: 1,
      name: "การอบรมเชิงปฏิบัติการ: การสอนออนไลน์",
      department: "วิศวกรรมคอมพิวเตอร์",
      major: "วิทยาการคอมพิวเตอร์",
      participants: "15/30",
      enrolledCount: 15,
      maxCount: 30,
    },
    {
      key: "2",
      id: 2,
      name: "สัมมนาพัฒนาศักยภาพอาจารย์",
      department: "วิศวกรรมไฟฟ้า",
      major: "วิศวกรรมไฟฟ้า",
      participants: "22/25",
      enrolledCount: 22,
      maxCount: 25,
    },
    {
      key: "3",
      id: 3,
      name: "การประชุมคณะกรรมการพัฒนาหลักสูตร",
      department: "วิศวกรรมคอมพิวเตอร์",
      major: "เทคโนโลยีสารสนเทศ",
      participants: "8/15",
      enrolledCount: 8,
      maxCount: 15,
    },
    {
      key: "4",
      id: 4,
      name: "งานวิจัยและนวัตกรรม",
      department: "วิศวกรรมเครื่องกล",
      major: "วิศวกรรมเครื่องกล",
      participants: "30/40",
      enrolledCount: 30,
      maxCount: 40,
    },
    {
      key: "5",
      id: 5,
      name: "การพัฒนาหลักสูตรใหม่",
      department: "วิศวกรรมโยธา",
      major: "วิศวกรรมโยธา",
      participants: "12/20",
      enrolledCount: 12,
      maxCount: 20,
    },
  ];

  // Table columns for admin view
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
    },
    {
      title: "กิจกรรม",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "ภาควิชา",
      dataIndex: "department",
      key: "department",
      width: 200,
    },
    {
      title: "สาขาวิชา",
      dataIndex: "major",
      key: "major",
      width: 200,
    },
    {
      title: "จำนวนนักศึกษาที่เข้าร่วม",
      dataIndex: "participants",
      key: "participants",
      width: 180,
      align: "center",
      render: (text, record) => (
        <span style={{ 
          color: record.enrolledCount === record.maxCount ? "#52c41a" : 
                 record.enrolledCount >= record.maxCount * 0.8 ? "#faad14" : "#1890ff",
          fontWeight: "500"
        }}>
          {text}
        </span>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          size="small"
          style={{
            backgroundColor: "#3D5753",
            borderColor: "#3D5753",
          }}
          onClick={() => handleViewDetails(record)}
        >
          ดูรายละเอียด
        </Button>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    console.log("View details for:", record);
    // Handle view details action
  };

  // Filter data based on search criteria
  const filteredData = allData.filter((item) => {
    const matchesSearch =
      searchValue === "" ||
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.department.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.major.toLowerCase().includes(searchValue.toLowerCase());
    const matchesDepartment =
      department === "all" || item.department.includes(department);
    const matchesMajor = major === "all" || item.major.includes(major);

    return matchesSearch && matchesDepartment && matchesMajor;
  });

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
              title: "การเข้าร่วมกิจกรรม",
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
            การเข้าร่วมกิจกรรม
          </Title>

          <SearchBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            department={department}
            onDepartmentChange={setDepartment}
            major={major}
            onMajorChange={setMajor}
          />

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
            scroll={{ x: 1200 }}
            style={{ marginTop: "16px" }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
