"use client";

import { useState } from "react";
import { 
  Layout, 
  Typography, 
  Form, 
  Input, 
  DatePicker, 
  TimePicker, 
  Button, 
  Select,
  InputNumber,
  Upload,
  Card,
  Row,
  Col,
  Space,
  Divider,
  message
} from "antd";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import { 
  LogoutOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  UploadOutlined,
  InboxOutlined 
} from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

export default function AdminCreateActivity() {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([
    { id: 1, name: "วิศวกรรมคอมพิวเตอร์", majors: ["วิทยาการคอมพิวเตอร์", "เทคโนโลยีสารสนเทศ"], students: 0 },
    { id: 2, name: "วิศวกรรมไฟฟ้า", majors: ["วิศวกรรมไฟฟ้า", "วิศวกรรมอิเล็กทรอนิกส์"], students: 0 }
  ]);
  const [fileList, setFileList] = useState([]);
  
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Add new department
  const addDepartment = () => {
    const newId = Math.max(...departments.map(d => d.id)) + 1;
    setDepartments([...departments, { 
      id: newId, 
      name: "", 
      majors: [""], 
      students: 0 
    }]);
  };

  // Remove department
  const removeDepartment = (id) => {
    if (departments.length > 1) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  // Update department name
  const updateDepartmentName = (id, name) => {
    setDepartments(departments.map(d => 
      d.id === id ? { ...d, name } : d
    ));
  };

  // Add major to department
  const addMajor = (deptId) => {
    setDepartments(departments.map(d => 
      d.id === deptId ? { ...d, majors: [...d.majors, ""] } : d
    ));
  };

  // Remove major from department
  const removeMajor = (deptId, majorIndex) => {
    setDepartments(departments.map(d => 
      d.id === deptId ? { 
        ...d, 
        majors: d.majors.filter((_, index) => index !== majorIndex)
      } : d
    ));
  };

  // Update major name
  const updateMajorName = (deptId, majorIndex, name) => {
    setDepartments(departments.map(d => 
      d.id === deptId ? {
        ...d,
        majors: d.majors.map((major, index) => 
          index === majorIndex ? name : major
        )
      } : d
    ));
  };

  // Update student count for department
  const updateStudentCount = (deptId, count) => {
    setDepartments(departments.map(d => 
      d.id === deptId ? { ...d, students: count } : d
    ));
  };

  // Handle file upload
  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = (values) => {
    const formData = {
      ...values,
      departments: departments,
      attachments: fileList
    };
    console.log("Form values:", formData);
    message.success("สร้างกิจกรรมเรียบร้อยแล้ว");
  };

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
              title: "เพิ่มกิจกรรม",
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
              marginBottom: "32px",
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
            style={{ maxWidth: "1000px" }}
          >
            {/* Basic Information Section */}
            <Card 
              title="ข้อมูลพื้นฐาน" 
              style={{ marginBottom: "24px" }}
              headStyle={{ 
                backgroundColor: "#f5f5f5", 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: "600"
              }}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="ชื่อกิจกรรม"
                    name="activityName"
                    rules={[{ required: true, message: "กรุณากรอกชื่อกิจกรรม" }]}
                  >
                    <Input placeholder="ระบุชื่อกิจกรรม" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="รายละเอียดกิจกรรม"
                    name="description"
                    rules={[{ required: true, message: "กรุณากรอกรายละเอียดกิจกรรม" }]}
                  >
                    <TextArea rows={4} placeholder="ระบุรายละเอียดกิจกรรม" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="ระดับชั้นปี"
                    name="academicYear"
                    rules={[{ required: true, message: "กรุณาเลือกระดับชั้นปี" }]}
                  >
                    <Select placeholder="เลือกระดับชั้นปี" size="large">
                      <Option value="1">ปี 1</Option>
                      <Option value="2">ปี 2</Option>
                      <Option value="3">ปี 3</Option>
                      <Option value="4">ปี 4</Option>
                      <Option value="all">ทุกชั้นปี</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="จำนวนชั่วโมง"
                    name="hours"
                    rules={[{ required: true, message: "กรุณากรอกจำนวนชั่วโมง" }]}
                  >
                    <InputNumber
                      placeholder="จำนวนชั่วโมง"
                      min={1}
                      max={100}
                      style={{ width: "100%" }}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="สถานที่"
                    name="location"
                    rules={[{ required: true, message: "กรุณากรอกสถานที่" }]}
                  >
                    <Input placeholder="ระบุสถานที่จัดกิจกรรม" size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Time and Duration Section */}
            <Card 
              title="ระยะเวลาที่จัด" 
              style={{ marginBottom: "24px" }}
              headStyle={{ 
                backgroundColor: "#f5f5f5", 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: "600"
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="กำหนดเวลากิจกรรม"
                    name="activityPeriod"
                    rules={[{ required: true, message: "กรุณาเลือกช่วงเวลากิจกรรม" }]}
                  >
                    <RangePicker
                      style={{ width: "100%" }}
                      size="large"
                      placeholder={["วันที่เริ่มต้น", "วันที่สิ้นสุด"]}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="เวลาเริ่มต้น"
                    name="startTime"
                    rules={[{ required: true, message: "กรุณาเลือกเวลาเริ่มต้น" }]}
                  >
                    <TimePicker
                      style={{ width: "100%" }}
                      format="HH:mm"
                      size="large"
                      placeholder="เวลาเริ่มต้น"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="เวลาสิ้นสุด"
                    name="endTime"
                    rules={[{ required: true, message: "กรุณาเลือกเวลาสิ้นสุด" }]}
                  >
                    <TimePicker
                      style={{ width: "100%" }}
                      format="HH:mm"
                      size="large"
                      placeholder="เวลาสิ้นสุด"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Departments and Majors Section */}
            <Card 
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>ภาควิชาและสาขาวิชา</span>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addDepartment}
                    style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                  >
                    เพิ่มภาควิชา
                  </Button>
                </div>
              }
              style={{ marginBottom: "24px" }}
              headStyle={{ 
                backgroundColor: "#f5f5f5", 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: "600"
              }}
            >
              {departments.map((dept, deptIndex) => (
                <Card
                  key={dept.id}
                  type="inner"
                  title={`ภาควิชาที่ ${deptIndex + 1}`}
                  extra={
                    departments.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeDepartment(dept.id)}
                      >
                        ลบภาควิชา
                      </Button>
                    )
                  }
                  style={{ marginBottom: "16px" }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="ชื่อภาควิชา"
                        required
                      >
                        <Input
                          placeholder="ระบุชื่อภาควิชา"
                          value={dept.name}
                          onChange={(e) => updateDepartmentName(dept.id, e.target.value)}
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="จำนวนนักศึกษาที่รับ"
                        required
                      >
                        <InputNumber
                          placeholder="จำนวนนักศึกษา"
                          min={0}
                          value={dept.students}
                          onChange={(value) => updateStudentCount(dept.id, value)}
                          style={{ width: "100%" }}
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontWeight: "600", fontFamily: "'Kanit', sans-serif" }}>
                        สาขาวิชา
                      </span>
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => addMajor(dept.id)}
                        size="small"
                      >
                        เพิ่มสาขา
                      </Button>
                    </div>
                    
                    {dept.majors.map((major, majorIndex) => (
                      <div key={majorIndex} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <Input
                          placeholder="ชื่อสาขาวิชา"
                          value={major}
                          onChange={(e) => updateMajorName(dept.id, majorIndex, e.target.value)}
                          style={{ flex: 1 }}
                        />
                        {dept.majors.length > 1 && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeMajor(dept.id, majorIndex)}
                            size="small"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </Card>

            {/* File Upload Section */}
            <Card 
              title="แนบภาพประกอบ" 
              style={{ marginBottom: "24px" }}
              headStyle={{ 
                backgroundColor: "#f5f5f5", 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: "600"
              }}
            >
              <Form.Item name="attachments">
                <Dragger
                  fileList={fileList}
                  onChange={handleUpload}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่เพื่ออัพโหลด</p>
                  <p className="ant-upload-hint">
                    รองรับไฟล์ภาพ, PDF, Word (ขนาดไม่เกิน 10MB)
                  </p>
                </Dragger>
              </Form.Item>
            </Card>

            {/* Notes Section */}
            <Card 
              title="หมายเหตุ" 
              style={{ marginBottom: "32px" }}
              headStyle={{ 
                backgroundColor: "#f5f5f5", 
                fontFamily: "'Kanit', sans-serif",
                fontWeight: "600"
              }}
            >
              <Form.Item name="notes">
                <TextArea
                  rows={3}
                  placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                />
              </Form.Item>
            </Card>

            {/* Submit Button */}
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    backgroundColor: "#3D5753",
                    borderColor: "#3D5753",
                    fontFamily: "'Kanit', sans-serif",
                    padding: "0 32px",
                  }}
                >
                  สร้างกิจกรรม
                </Button>
                <Button
                  size="large"
                  onClick={() => router.push("/admin/activities")}
                  style={{
                    fontFamily: "'Kanit', sans-serif",
                    padding: "0 32px",
                  }}
                >
                  ยกเลิก
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
}