"use client";

import { Input, Select, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./SearchBar.css";

const { Option } = Select;

export default function SearchBar({
  searchValue,
  onSearchChange,
  department,
  onDepartmentChange,
  major,
  onMajorChange,
  year,
  onYearChange,
}) {
  // ข้อมูลตัวอย่างสำหรับ dropdown
  const departments = [
    { value: "all", label: "ทุกภาควิชา" },
    { value: "computer", label: "วิทยาการคอมพิวเตอร์" },
    { value: "electrical", label: "วิศวกรรมไฟฟ้า" },
    { value: "mechanical", label: "วิศวกรรมเครื่องกล" },
    { value: "civil", label: "วิศวกรรมโยธา" },
    { value: "industrial", label: "วิศวกรรมอุตสาหการ" },
  ];

  const majors = [
    { value: "all", label: "ทุกสาขาวิชา" },
    { value: "cs", label: "วิทยาการคอมพิวเตอร์" },
    { value: "it", label: "เทคโนโลยีสารสนเทศ" },
    { value: "ce", label: "วิศวกรรมคอมพิวเตอร์" },
    { value: "ee", label: "วิศวกรรมไฟฟ้า" },
    { value: "me", label: "วิศวกรรมเครื่องกล" },
  ];

  const years = [
    { value: "all", label: "ทุกชั้นปี" },
    { value: "1", label: "ปี 1" },
    { value: "2", label: "ปี 2" },
    { value: "3", label: "ปี 3" },
    { value: "4", label: "ปี 4" },
  ];

  return (
    <div className="search-bar-container">
      <div className="search-bar-header">
        <h3>ค้นหาและกรองข้อมูล</h3>
      </div>

      <Row gutter={[16, 16]} className="search-bar-content">
        {/* Search Input */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <div className="search-input-wrapper">
            <label>ค้นหา</label>
            <Input
              placeholder="ค้นหากิจกรรม, อาจารย์, หรือหัวข้อ..."
              prefix={<SearchOutlined className="search-icon" />}
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="search-input"
              size="large"
            />
          </div>
        </Col>

        {/* Department Dropdown */}
        <Col xs={24} sm={8} md={8} lg={5}>
          <div className="select-wrapper">
            <label>ภาควิชา</label>
            <Select
              value={department}
              onChange={onDepartmentChange}
              className="select-dropdown"
              placeholder="เลือกภาควิชา"
              size="large"
            >
              {departments.map((dept) => (
                <Option key={dept.value} value={dept.value}>
                  {dept.label}
                </Option>
              ))}
            </Select>
          </div>
        </Col>

        {/* Major Dropdown */}
        <Col xs={24} sm={8} md={8} lg={6}>
          <div className="select-wrapper">
            <label>สาขาวิชา</label>
            <Select
              value={major}
              onChange={onMajorChange}
              className="select-dropdown"
              placeholder="เลือกสาขาวิชา"
              size="large"
            >
              {majors.map((maj) => (
                <Option key={maj.value} value={maj.value}>
                  {maj.label}
                </Option>
              ))}
            </Select>
          </div>
        </Col>

        {/* Year Dropdown */}
        <Col xs={24} sm={8} md={4} lg={5}>
          <div className="select-wrapper">
            <label>ชั้นปี</label>
            <Select
              value={year}
              onChange={onYearChange}
              className="select-dropdown"
              placeholder="เลือกชั้นปี"
              size="large"
            >
              {years.map((yr) => (
                <Option key={yr.value} value={yr.value}>
                  {yr.label}
                </Option>
              ))}
            </Select>
          </div>
        </Col>
      </Row>
    </div>
  );
}
