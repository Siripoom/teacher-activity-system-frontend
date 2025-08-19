"use client";

import { Layout, Typography, Button, Avatar, Dropdown, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "โปรไฟล์",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "ออกจากระบบ",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-md px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <DashboardOutlined className="text-2xl text-emerald-600" />
          <Title level={3} className="mb-0 text-gray-800">
            ระบบจัดเก็บข้อมูลกิจกรรม
          </Title>
        </div>

        <div className="flex items-center space-x-4">
          <Text className="text-gray-600">
            ยินดีต้อนรับ, {user?.name || user?.email || "ผู้ใช้"}
          </Text>
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="cursor-pointer bg-emerald-600"
            />
          </Dropdown>
        </div>
      </Header>

      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <Title level={2} className="text-gray-800 mb-4">
                ยินดีต้อนรับสู่ระบบจัดเก็บข้อมูลกิจกรรม
              </Title>
              <Text className="text-gray-600 text-lg">
                เริ่มต้นการจัดการข้อมูลกิจกรรมของคุณได้แล้ว
              </Text>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dashboard cards will be added here */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-lg text-white">
                <Title level={4} className="text-white mb-2">
                  กิจกรรมทั้งหมด
                </Title>
                <Text className="text-emerald-100">
                  จำนวนกิจกรรมที่บันทึกไว้ในระบบ
                </Text>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
                <Title level={4} className="text-white mb-2">
                  กิจกรรมล่าสุด
                </Title>
                <Text className="text-blue-100">
                  กิจกรรมที่เพิ่มเข้าระบบล่าสุด
                </Text>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
                <Title level={4} className="text-white mb-2">
                  รายงาน
                </Title>
                <Text className="text-orange-100">สร้างและดูรายงานกิจกรรม</Text>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
