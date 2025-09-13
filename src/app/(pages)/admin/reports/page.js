"use client";

import { useState, useEffect } from "react";
import { 
  Layout, 
  Typography, 
  Card, 
  Button, 
  Row, 
  Col, 
  Input, 
  Select, 
  Table, 
  Modal,
  Checkbox,
  Space,
  message,
  Divider
} from "antd";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import { 
  SearchOutlined, 
  PrinterOutlined, 
  DownloadOutlined, 
  EyeOutlined,
  FileExcelOutlined,
  FilePdfOutlined
} from "@ant-design/icons";
import { useAuth } from "../../../../components/AuthContext";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title } = Typography;

export default function AdminReports() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [participantsModal, setParticipantsModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  
  const { user } = useAuth();
  const router = useRouter();

  // Mock data
  const departments = [
    { value: "engineering", label: "คณะวิศวกรรมศาสตร์" },
    { value: "science", label: "คณะวิทยาศาสตร์" },
    { value: "business", label: "คณะบริหารธุรกิจ" },
    { value: "arts", label: "คณะศิลปศาสตร์" },
  ];

  const majors = {
    engineering: [
      { value: "computer", label: "วิศวกรรมคอมพิวเตอร์" },
      { value: "electrical", label: "วิศวกรรมไฟฟ้า" },
      { value: "mechanical", label: "วิศวกรรมเครื่องกล" },
    ],
    science: [
      { value: "math", label: "คณิตศาสตร์" },
      { value: "physics", label: "ฟิสิกส์" },
      { value: "chemistry", label: "เคมี" },
    ],
    business: [
      { value: "management", label: "การจัดการ" },
      { value: "marketing", label: "การตลาด" },
      { value: "accounting", label: "การบัญชี" },
    ],
    arts: [
      { value: "thai", label: "ภาษาไทย" },
      { value: "english", label: "ภาษาอังกฤษ" },
      { value: "history", label: "ประวัติศาสตร์" },
    ],
  };

  const years = [
    { value: "1", label: "ชั้นปีที่ 1" },
    { value: "2", label: "ชั้นปีที่ 2" },
    { value: "3", label: "ชั้นปีที่ 3" },
    { value: "4", label: "ชั้นปีที่ 4" },
  ];

  // Mock activities data
  const mockActivities = [
    {
      key: "1",
      activityName: "สัมมนาเทคโนโลยีใหม่",
      date: "2025-01-15",
      department: "คณะวิศวกรรมศาสตร์",
      major: "วิศวกรรมคอมพิวเตอร์",
      year: "ชั้นปีที่ 3",
      participantCount: 45,
      status: "สิ้นสุดแล้ว"
    },
    {
      key: "2",
      activityName: "การประชุมวิชาการ",
      date: "2025-01-20",
      department: "คณะวิทยาศาสตร์",
      major: "คณิตศาสตร์",
      year: "ชั้นปีที่ 2",
      participantCount: 32,
      status: "กำลังดำเนินการ"
    },
    {
      key: "3",
      activityName: "อบรมภาวะผู้นำ",
      date: "2025-01-25",
      department: "คณะบริหารธุรกิจ",
      major: "การจัดการ",
      year: "ชั้นปีที่ 4",
      participantCount: 28,
      status: "ยังไม่เริ่ม"
    },
  ];

  // Mock participants data
  const mockParticipants = [
    {
      key: "1",
      studentId: "65010001",
      name: "นายสมชาย ใจดี",
      department: "คณะวิศวกรรมศาสตร์",
      major: "วิศวกรรมคอมพิวเตอร์",
      year: "3",
      email: "somchai@email.com"
    },
    {
      key: "2",
      studentId: "65010002",
      name: "นางสาวสมหญิง รักเรียน",
      department: "คณะวิศวกรรมศาสตร์",
      major: "วิศวกรรมคอมพิวเตอร์",
      year: "3",
      email: "somying@email.com"
    },
    {
      key: "3",
      studentId: "65010003",
      name: "นายสมศักดิ์ ขยันเรียน",
      department: "คณะวิศวกรรมศาสตร์",
      major: "วิศวกรรมคอมพิวเตอร์",
      year: "3",
      email: "somsak@email.com"
    },
  ];

  useEffect(() => {
    setActivities(mockActivities);
  }, []);

  // Filter activities based on search and dropdowns
  const filteredActivities = activities.filter(activity => {
    const matchSearch = !searchText || activity.activityName.toLowerCase().includes(searchText.toLowerCase());
    const matchDepartment = !selectedDepartment || activity.department === departments.find(d => d.value === selectedDepartment)?.label;
    const matchMajor = !selectedMajor || activity.major === majors[selectedDepartment]?.find(m => m.value === selectedMajor)?.label;
    const matchYear = !selectedYear || activity.year === years.find(y => y.value === selectedYear)?.label;
    
    return matchSearch && matchDepartment && matchMajor && matchYear;
  });

  // Handle view participants
  const handleViewParticipants = (activity) => {
    setSelectedActivity(activity);
    setParticipants(mockParticipants);
    setSelectedParticipants([]);
    setParticipantsModal(true);
  };

  // Handle download report
  const handleDownloadReport = (format) => {
    if (selectedParticipants.length === 0) {
      message.warning('กรุณาเลือกรายชื่อผู้เข้าร่วมที่ต้องการดาวน์โหลด');
      return;
    }
    
    message.success(`กำลังดาวน์โหลดรายงานในรูปแบบ ${format === 'excel' ? 'Excel' : 'PDF'}`);
    // TODO: Implement actual download logic
  };

  // Table columns for activities
  const activityColumns = [
    {
      title: 'ชื่อกิจกรรม',
      dataIndex: 'activityName',
      key: 'activityName',
      render: (text, record) => (
        <Button 
          type="link" 
          onClick={() => handleViewParticipants(record)}
          style={{ 
            padding: 0, 
            height: 'auto',
            fontFamily: "'Kanit', sans-serif" 
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'วันที่',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'ภาควิชา',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'สาขาวิชา',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'ชั้นปี',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'จำนวนผู้เข้าร่วม',
      dataIndex: 'participantCount',
      key: 'participantCount',
      align: 'center',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
    {
      title: 'การดำเนินการ',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleViewParticipants(record)}
          style={{
            backgroundColor: "#3D5753",
            borderColor: "#3D5753",
          }}
        >
          ดูรายชื่อ
        </Button>
      ),
    },
  ];

  // Table columns for participants
  const participantColumns = [
    {
      title: 'เลือก',
      key: 'select',
      render: (_, record) => (
        <Checkbox
          checked={selectedParticipants.includes(record.key)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedParticipants([...selectedParticipants, record.key]);
            } else {
              setSelectedParticipants(selectedParticipants.filter(key => key !== record.key));
            }
          }}
        />
      ),
    },
    {
      title: 'รหัสนักศึกษา',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ภาควิชา',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'สาขาวิชา',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'ชั้นปี',
      dataIndex: 'year',
      key: 'year',
      align: 'center',
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const reportTypes = [
    {
      title: "รายงานกิจกรรมทั้งหมด",
      description: "รายงานสรุปกิจกรรมทั้งหมดในระบบ",
      icon: <PrinterOutlined style={{ fontSize: "24px", color: "#3D5753" }} />,
    },
    {
      title: "รายงานการเข้าร่วมกิจกรรม",
      description: "รายงานสถิติการเข้าร่วมกิจกรรมของบุคคลากร",
      icon: <PrinterOutlined style={{ fontSize: "24px", color: "#3D5753" }} />,
    },
    {
      title: "รายงานบุคคลากร",
      description: "รายงานข้อมูลบุคคลากรในระบบ",
      icon: <PrinterOutlined style={{ fontSize: "24px", color: "#3D5753" }} />,
    },
    {
      title: "รายงานประจำเดือน",
      description: "รายงานสรุปกิจกรรมประจำเดือน",
      icon: <PrinterOutlined style={{ fontSize: "24px", color: "#3D5753" }} />,
    },
    {
      title: "รายงานประจำปี",
      description: "รายงานสรุปกิจกรรมประจำปี",
      icon: <PrinterOutlined style={{ fontSize: "24px", color: "#3D5753" }} />,
    },
    {
      title: "รายงานแบบกำหนดเอง",
      description: "สร้างรายงานตามเงื่อนไขที่กำหนด",
      icon: <PrinterOutlined style={{ fontSize: "24px", color: "#3D5753" }} />,
    },
  ];

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
              title: "พิมพ์รายงาน",
            },
          ]}
        />
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
            ระบบพิมพ์รายงาน
          </Title>
          
          {/* Search and Filter Section */}
          <Card
            style={{
              marginBottom: "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Input
                  placeholder="ค้นหากิจกรรม..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{
                    fontFamily: "'Kanit', sans-serif",
                  }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="เลือกภาควิชา"
                  value={selectedDepartment}
                  onChange={(value) => {
                    setSelectedDepartment(value);
                    setSelectedMajor(null); // Reset major when department changes
                  }}
                  style={{
                    width: "100%",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                  allowClear
                  options={departments}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="เลือกสาขาวิชา"
                  value={selectedMajor}
                  onChange={setSelectedMajor}
                  style={{
                    width: "100%",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                  allowClear
                  disabled={!selectedDepartment}
                  options={selectedDepartment ? majors[selectedDepartment] : []}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="เลือกชั้นปี"
                  value={selectedYear}
                  onChange={setSelectedYear}
                  style={{
                    width: "100%",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                  allowClear
                  options={years}
                />
              </Col>
            </Row>
          </Card>

          {/* Activities Table */}
          <Card
            title={`รายการกิจกรรม (${filteredActivities.length} รายการ)`}
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            headStyle={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <Table
              columns={activityColumns}
              dataSource={filteredActivities}
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} จาก ${total} รายการ`,
              }}
              style={{
                fontFamily: "'Kanit', sans-serif",
              }}
            />
          </Card>

          {/* Participants Modal */}
          <Modal
            title={`รายชื่อผู้เข้าร่วมกิจกรรม: ${selectedActivity?.activityName}`}
            open={participantsModal}
            onCancel={() => setParticipantsModal(false)}
            width={1000}
            footer={[
              <Button key="cancel" onClick={() => setParticipantsModal(false)}>
                ยกเลิก
              </Button>,
              <Button
                key="select-all"
                onClick={() => {
                  if (selectedParticipants.length === participants.length) {
                    setSelectedParticipants([]);
                  } else {
                    setSelectedParticipants(participants.map(p => p.key));
                  }
                }}
              >
                {selectedParticipants.length === participants.length ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
              </Button>,
              <Button
                key="download-excel"
                type="primary"
                icon={<FileExcelOutlined />}
                onClick={() => handleDownloadReport('excel')}
                style={{
                  backgroundColor: "#52c41a",
                  borderColor: "#52c41a",
                }}
              >
                ดาวน์โหลด Excel
              </Button>,
              <Button
                key="download-pdf"
                type="primary"
                icon={<FilePdfOutlined />}
                onClick={() => handleDownloadReport('pdf')}
                style={{
                  backgroundColor: "#ff4d4f",
                  borderColor: "#ff4d4f",
                }}
              >
                ดาวน์โหลด PDF
              </Button>,
            ]}
          >
            <div style={{ marginBottom: "16px" }}>
              <Space>
                <span style={{ fontFamily: "'Kanit', sans-serif" }}>
                  เลือกแล้ว: {selectedParticipants.length} จาก {participants.length} คน
                </span>
              </Space>
            </div>
            
            <Table
              columns={participantColumns}
              dataSource={participants}
              pagination={false}
              size="small"
              style={{
                fontFamily: "'Kanit', sans-serif",
              }}
              scroll={{ y: 400 }}
            />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}