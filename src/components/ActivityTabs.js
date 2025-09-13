"use client";

import { useState } from "react";
import { Tabs, Table, Tag, Button } from "antd";
import {
  CalendarOutlined,
  FileTextOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import "./ActivityTabs.css";

export default function ActivityTabs({
  filteredData,
  searchValue,
  department,
  major,
  year,
}) {
  const [activeTab, setActiveTab] = useState("participation");

  // Columns for participation table
  const participationColumns = [
    {
      title: "ชื่อกิจกรรม",
      dataIndex: "name",
      key: "name",
      width: "35%",
    },
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
      width: "15%",
    },
    {
      title: "เวลา",
      dataIndex: "time",
      key: "time",
      width: "15%",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status) => (
        <Tag color={status === "เข้าร่วมแล้ว" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Button type="primary" size="small" className="action-button">
          {record.status === "เข้าร่วมแล้ว" ? "ดูรายละเอียด" : "เข้าร่วม"}
        </Button>
      ),
    },
  ];

  // Columns for evidence table
  const evidenceColumns = [
    {
      title: "ชื่อกิจกรรม",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "วันที่เข้าร่วม",
      dataIndex: "date",
      key: "date",
      width: "15%",
    },
    {
      title: "ประเภทหลักฐาน",
      dataIndex: "evidenceType",
      key: "evidenceType",
      width: "15%",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "สถานะการอัปโหลด",
      dataIndex: "uploadStatus",
      key: "uploadStatus",
      width: "15%",
      render: (status) => (
        <Tag color={status === "อัปโหลดแล้ว" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      width: "25%",
      render: (_, record) => (
        <div className="evidence-actions">
          {record.uploadStatus === "อัปโหลดแล้ว" ? (
            <>
              <Button
                type="default"
                size="small"
                icon={<EyeOutlined />}
                className="action-button view-button"
              >
                ดู
              </Button>
              <Button
                type="default"
                size="small"
                icon={<DownloadOutlined />}
                className="action-button download-button"
              >
                ดาวน์โหลด
              </Button>
            </>
          ) : (
            <Button type="primary" size="small" className="action-button">
              อัปโหลดหลักฐาน
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Sample evidence data
  const evidenceData = filteredData
    .filter((item) => item.status === "เข้าร่วมแล้ว")
    .map((item) => ({
      ...item,
      evidenceType: item.key === "2" ? "ใบประกาศนียบัตร" : "รูปภาพ",
      uploadStatus: item.key === "2" ? "อัปโหลดแล้ว" : "ยังไม่อัปโหลด",
    }));

  const tabItems = [
    {
      key: "participation",
      label: (
        <span className="tab-label">
          <CalendarOutlined />
          เข้าร่วมกิจกรรม
        </span>
      ),
      children: (
        <div className="tab-content">
          <Table
            columns={participationColumns}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} จาก ${total} รายการ`,
            }}
            className="activity-table"
          />
        </div>
      ),
    },
    {
      key: "evidence",
      label: (
        <span className="tab-label">
          <FileTextOutlined />
          หลักฐานการเข้าร่วม
        </span>
      ),
      children: (
        <div className="tab-content">
          <Table
            columns={evidenceColumns}
            dataSource={evidenceData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} จาก ${total} รายการ`,
            }}
            className="activity-table"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="activity-tabs-container">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="activity-tabs"
        size="large"
      />
    </div>
  );
}
