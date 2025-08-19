"use client";

import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../components/AuthContext";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await login(values);

      if (result.success) {
        // Redirect to dashboard on successful login
        router.push("/dashboard");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="logo-section text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="FTE KMUTNB Logo"
              width={120}
              height={120}
              className="rounded-lg drop-shadow-lg"
            />
          </div>
          <div className="text-orange-400 font-bold text-2xl mb-2 drop-shadow-md">
            FTE KMUTNB
          </div>
        </div>

        {/* Login Card */}
        <Card className="login-card login-form shadow-2xl border-0">
          <div className="text-center mb-6">
            <Title level={4} className="mb-2 text-gray-800">
              ระบบบันทึกข้อมูลกิจกรรมอาจารย์กิจกรรม
            </Title>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="Login"
              name="email"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกอีเมล",
                },
                {
                  type: "email",
                  message: "รูปแบบอีเมลไม่ถูกต้อง",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter email address"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกรหัสผ่าน",
                },
                {
                  min: 6,
                  message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter password"
                className="h-12"
              />
            </Form.Item>

            <div className="text-right mb-4">
              <Button type="link" className="p-0 text-sm text-gray-500">
                Forgot password?
              </Button>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gray-800 hover:bg-gray-700 border-gray-800 text-white font-medium text-base"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
