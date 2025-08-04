"use client";

import { useState } from "react";
import { Layout, Row, Col, Typography, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ActivityCard from "../components/ActivityCard";

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header />
        <Layout style={{ padding: "0" }}>
          <Content
            style={{
              margin: "24px",
              padding: "32px",
              backgroundColor: "#3D5753",
              borderRadius: "16px",
              minHeight: "calc(100vh - 128px)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Title
                level={1}
                style={{
                  color: "white",
                  marginBottom: "8px",
                  fontSize: "36px",
                  fontWeight: "bold",
                }}
              >
                ข่าวสารกิจกรรม
              </Title>
              <p style={{ color: "white", fontSize: "16px", margin: 0 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Col xs={24} sm={12} lg={8} key={item}>
                  <ActivityCard />
                </Col>
              ))}
            </Row>

            <div style={{ textAlign: "center" }}>
              <Button
                type="text"
                icon={<LeftOutlined />}
                style={{
                  color: "white",
                  marginRight: "16px",
                }}
              />
              <div
                style={{
                  display: "inline-block",
                  width: "32px",
                  height: "8px",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  marginRight: "8px",
                }}
              />
              <div
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "4px",
                  marginRight: "16px",
                }}
              />
              <Button
                type="text"
                icon={<RightOutlined />}
                style={{
                  color: "white",
                }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
