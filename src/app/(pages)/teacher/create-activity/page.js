"use client";

import { useState } from "react";
import { Layout, Typography, Form, Input, DatePicker, TimePicker, Button } from "antd";
import { TeacherSidebar } from "../../../../components/teacher/TeacherSidebar";
import Header from "../../../../components/Header";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

export default function CreateActivity() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

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
            เพิ่มกิจกรรมใหม่
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="activityName"
              label="ชื่อกิจกรรม"
              rules={[{ required: true, message: "กรุณากรอกชื่อกิจกรรม" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="รายละเอียดกิจกรรม"
              rules={[{ required: true, message: "กรุณากรอกรายละเอียดกิจกรรม" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="date"
              label="วันที่จัดกิจกรรม"
              rules={[{ required: true, message: "กรุณาเลือกวันที่" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="time"
              label="เวลา"
              rules={[{ required: true, message: "กรุณาเลือกเวลา" }]}
            >
              <TimePicker.RangePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="location"
              label="สถานที่"
              rules={[{ required: true, message: "กรุณากรอกสถานที่" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="capacity"
              label="จำนวนผู้เข้าร่วมสูงสุด"
              rules={[{ required: true, message: "กรุณากรอกจำนวนผู้เข้าร่วม" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#3D5753",
                  width: "100%",
                }}
              >
                บันทึกกิจกรรม
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
}
