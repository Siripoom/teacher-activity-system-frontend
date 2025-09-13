"use client";

import { useState } from "react";
import { Card, Row, Col, Tabs, Table, Statistic, Tag, Avatar } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  ApartmentOutlined,
  CalendarOutlined,
  TrophyOutlined,
  BookOutlined,
  ExperimentOutlined,
  HeartOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("computer");

  // Personnel data
  const personnelData = {
    students: 1248,
    faculty: 89,
    staff: 45,
  };

  // Department data
  const departmentData = {
    computer: {
      name: "วิทยาการคอมพiวเตอร์",
      students: 456,
      faculty: 15,
      activities: {
        academic: 12,
        research: 8,
        service: 6,
        creative: 4,
        social: 10,
        environment: 5,
      },
    },
    electrical: {
      name: "วิศวกรรมไฟฟ้า",
      students: 234,
      faculty: 12,
      activities: {
        academic: 10,
        research: 15,
        service: 8,
        creative: 3,
        social: 7,
        environment: 6,
      },
    },
    mechanical: {
      name: "วิศวกรรมเครื่องกล",
      students: 198,
      faculty: 14,
      activities: {
        academic: 8,
        research: 12,
        service: 5,
        creative: 2,
        social: 9,
        environment: 4,
      },
    },
    civil: {
      name: "วิศวกรรมโยธา",
      students: 167,
      faculty: 11,
      activities: {
        academic: 9,
        research: 7,
        service: 6,
        creative: 5,
        social: 8,
        environment: 7,
      },
    },
    industrial: {
      name: "วิศวกรรมอุตสาหการ",
      students: 134,
      faculty: 10,
      activities: {
        academic: 6,
        research: 9,
        service: 4,
        creative: 3,
        social: 5,
        environment: 3,
      },
    },
    chemical: {
      name: "วิศวกรรมเคมี",
      students: 89,
      faculty: 8,
      activities: {
        academic: 5,
        research: 11,
        service: 3,
        creative: 2,
        social: 4,
        environment: 8,
      },
    },
  };

  // Recent activities data
  const recentActivities = [
    {
      key: "1",
      name: "การอบรมเชิงปฏิบัติการ: AI และ Machine Learning",
      department: "วิทยาการคอมพิวเตอร์",
      date: "2025-09-15",
      participants: 45,
      status: "กำลังดำเนินการ",
      category: "วิชาการ",
    },
    {
      key: "2",
      name: "โครงการวิจัยพัฒนาพลังงานหมุนเวียน",
      department: "วิศวกรรมไฟฟ้า",
      date: "2025-09-12",
      participants: 32,
      status: "เสร็จสิ้น",
      category: "วิจัย",
    },
    {
      key: "3",
      name: "กิจกรรมบริการวิชาการแก่ชุมชน",
      department: "วิศวกรรมโยธา",
      date: "2025-09-10",
      participants: 28,
      status: "เสร็จสิ้น",
      category: "บริการวิชาการ",
    },
    {
      key: "4",
      name: "การประกวดนวัตกรรมสีเขียว",
      department: "วิศวกรรมเคมี",
      date: "2025-09-08",
      participants: 67,
      status: "เสร็จสิ้น",
      category: "สิ่งแวดล้อม",
    },
    {
      key: "5",
      name: "สัมมนาพัฒนาทักษะผู้นำ",
      department: "วิศวกรรมอุตสาหการ",
      date: "2025-09-05",
      participants: 41,
      status: "เสร็จสิ้น",
      category: "สังคม",
    },
  ];

  // Activity categories with icons
  const activityCategories = [
    {
      key: "academic",
      name: "วิชาการ",
      icon: <BookOutlined />,
      color: "#1890ff",
    },
    {
      key: "research",
      name: "วิจัย",
      icon: <ExperimentOutlined />,
      color: "#52c41a",
    },
    {
      key: "service",
      name: "บริการวิชาการ",
      icon: <GlobalOutlined />,
      color: "#fa8c16",
    },
    {
      key: "creative",
      name: "สร้างสรรค์",
      icon: <TrophyOutlined />,
      color: "#eb2f96",
    },
    { key: "social", name: "สังคม", icon: <HeartOutlined />, color: "#722ed1" },
    {
      key: "environment",
      name: "สิ่งแวดล้อม",
      icon: <SafetyCertificateOutlined />,
      color: "#13c2c2",
    },
  ];

  // Table columns
  const activityColumns = [
    {
      title: "ชื่อกิจกรรม",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "ภาควิชา",
      dataIndex: "department",
      key: "department",
      width: "20%",
    },
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "ผู้เข้าร่วม",
      dataIndex: "participants",
      key: "participants",
      width: "10%",
      render: (participants) => `${participants} คน`,
    },
    {
      title: "หมวดหมู่",
      dataIndex: "category",
      key: "category",
      width: "15%",
      render: (category) => {
        const categoryInfo = activityCategories.find(
          (cat) => cat.name === category
        );
        return (
          <Tag color={categoryInfo?.color || "default"}>
            {categoryInfo?.icon} {category}
          </Tag>
        );
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "13%",
      render: (status) => (
        <Tag color={status === "เสร็จสิ้น" ? "green" : "processing"}>
          {status}
        </Tag>
      ),
    },
  ];

  // Create tab items for departments
  const departmentTabs = Object.entries(departmentData).map(([key, dept]) => ({
    key,
    label: dept.name,
    children: (
      <div className="department-stats">
        <Row gutter={[16, 16]} className="stats-row">
          <Col xs={24} sm={12} md={8}>
            <Card className="stat-card">
              <Statistic
                title="จำนวนนักศึกษา"
                value={dept.students}
                suffix="คน"
                prefix={<UserOutlined />}
                valueStyle={{ color: "#3D5753" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="stat-card">
              <Statistic
                title="จำนวนอาจารย์"
                value={dept.faculty}
                suffix="คน"
                prefix={<TeamOutlined />}
                valueStyle={{ color: "#3D5753" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card className="stat-card">
              <Statistic
                title="กิจกรรมทั้งหมด"
                value={Object.values(dept.activities).reduce(
                  (sum, val) => sum + val,
                  0
                )}
                suffix="กิจกรรม"
                prefix={<CalendarOutlined />}
                valueStyle={{ color: "#3D5753" }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          className="activities-breakdown-card"
          title="จำนวนกิจกรรมแยกตามหมวดหมู่"
        >
          <Row gutter={[16, 16]}>
            {activityCategories.map((category) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={category.key}>
                <Card className="category-stat-card">
                  <div className="category-stat">
                    <div
                      className="category-icon"
                      style={{ color: category.color }}
                    >
                      {category.icon}
                    </div>
                    <div className="category-info">
                      <div className="category-name">{category.name}</div>
                      <div className="category-count">
                        {dept.activities[category.key]} กิจกรรม
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    ),
  }));

  return (
    <div className="admin-dashboard">
      {/* Section 1: Personnel Overview */}
      <div className="dashboard-section">
        <h2 className="section-title">ภาพรวมบุคลากร</h2>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8} md={8}>
            <Card className="personnel-card student-card">
              <div className="personnel-content">
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  className="personnel-avatar"
                />
                <div className="personnel-info">
                  <h3>นักศึกษา</h3>
                  <div className="personnel-count">
                    {personnelData.students.toLocaleString()}
                  </div>
                  <span className="personnel-label">คน</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Card className="personnel-card faculty-card">
              <div className="personnel-content">
                <Avatar
                  size={64}
                  icon={<TeamOutlined />}
                  className="personnel-avatar"
                />
                <div className="personnel-info">
                  <h3>อาจารย์/เจ้าหน้าที่ภาควิชา</h3>
                  <div className="personnel-count">{personnelData.faculty}</div>
                  <span className="personnel-label">คน</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Card className="personnel-card staff-card">
              <div className="personnel-content">
                <Avatar
                  size={64}
                  icon={<ApartmentOutlined />}
                  className="personnel-avatar"
                />
                <div className="personnel-info">
                  <h3>เจ้าหน้าที่คณะ</h3>
                  <div className="personnel-count">{personnelData.staff}</div>
                  <span className="personnel-label">คน</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Section 2: Department Statistics */}
      <div className="dashboard-section">
        <h2 className="section-title">สถิติแยกตามภาควิชา</h2>
        <Card className="department-tabs-card">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={departmentTabs}
            className="department-tabs"
          />
        </Card>
      </div>

      {/* Section 3: Recent Activities */}
      <div className="dashboard-section">
        <h2 className="section-title">รายการกิจกรรมล่าสุด</h2>
        <Card className="recent-activities-card">
          <Table
            columns={activityColumns}
            dataSource={recentActivities}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
              showQuickJumper: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} จาก ${total} รายการ`,
            }}
            className="activities-table"
          />
        </Card>
      </div>
    </div>
  );
}
