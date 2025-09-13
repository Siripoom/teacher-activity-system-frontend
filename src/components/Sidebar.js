"use client";

import { Layout, Button, Menu } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  HomeOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar({ collapsed, setCollapsed }) {
  const [userRole, setUserRole] = useState(null);
  const [selectedKey, setSelectedKey] = useState("home");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check user role from localStorage
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  // Update selected key based on current pathname
  useEffect(() => {
    if (pathname) {
      if (pathname.includes("/dashboard")) {
        setSelectedKey("home");
      } else if (pathname.includes("/activities") && !pathname.includes("/create-activity")) {
        setSelectedKey("activities");
      } else if (pathname.includes("/create-activity")) {
        setSelectedKey("create-activity");
      } else if (pathname.includes("/personnel")) {
        setSelectedKey("personnel");
      } else if (pathname.includes("/reports")) {
        setSelectedKey("reports");
      }
    }
  }, [pathname]);

  // Admin menu items
  const adminMenuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "หน้าหลัก",
      onClick: () => {
        router.push("/admin/dashboard");
      },
    },
    {
      key: "activities",
      icon: <CalendarOutlined />,
      label: "การเข้าร่วมกิจกรรม",
      onClick: () => {
        router.push("/admin/activities");
      },
    },
    {
      key: "create-activity",
      icon: <PlusCircleOutlined />,
      label: "เพิ่มกิจกรรม",
      onClick: () => {
        router.push("/admin/create-activity");
      },
    },
    {
      key: "personnel",
      icon: <TeamOutlined />,
      label: "บุคคลากร",
      onClick: () => {
        router.push("/admin/personnel");
      },
    },
    {
      key: "reports",
      icon: <PrinterOutlined />,
      label: "พิมพ์รายงาน",
      onClick: () => {
        router.push("/admin/reports");
      },
    },
  ];

  // Teacher menu items
  const teacherMenuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "หน้าหลัก",
      onClick: () => {
        router.push("/teacher/dashboard");
      },
    },
    {
      key: "activities",
      icon: <CalendarOutlined />,
      label: "การเข้าร่วมกิจกรรม",
      onClick: () => {
        router.push("/teacher/activities");
      },
    },
    {
      key: "create-activity",
      icon: <PlusCircleOutlined />,
      label: "เพิ่มกิจกรรม",
      onClick: () => {
        router.push("/teacher/create-activity");
      },
    },
    {
      key: "reports",
      icon: <PrinterOutlined />,
      label: "พิมพ์รายงาน",
      onClick: () => {
        router.push("/teacher/reports");
      },
    },
  ];

  // Get menu items based on role
  const getMenuItems = () => {
    switch (userRole) {
      case "admin":
        return adminMenuItems;
      case "teacher":
        return teacherMenuItems;
      default:
        return [];
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        backgroundColor: "#3D5753",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        transition: "all 0.2s",
      }}
      width={200}
      collapsedWidth={80}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: collapsed ? "15px" : "15px 10px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            width: collapsed ? 75 : 180,
            height: collapsed ? 75 : 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <Image
            src="/logo.png"
            alt="KMUTNB Logo"
            width={collapsed ? 65 : 160}
            height={collapsed ? 65 : 140}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Role-based Menu Items */}
      {userRole && getMenuItems().length > 0 && (
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{
            backgroundColor: "transparent",
            border: "none",
            fontFamily: "'Kanit', sans-serif",
          }}
          items={getMenuItems()}
          className={userRole === "admin" ? "admin-sidebar-menu" : "teacher-sidebar-menu"}
        />
      )}

      {/* Default Home Button for users without role */}
      {!userRole && (
        <div style={{ padding: "0 16px 16px 16px" }}>
          <Button
            type="text"
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              width: "100%",
              height: "40px",
              fontWeight: "bold",
              color: "#3D5753",
              border: "none",
              fontSize: "16px",
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {collapsed ? "หน้า" : "หน้าหลัก"}
          </Button>
        </div>
      )}
    </Sider>
  );
}
