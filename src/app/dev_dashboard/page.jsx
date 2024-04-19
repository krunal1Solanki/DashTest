"use client"
import React, { useState } from 'react';
import { Select, Table, DatePicker, Tag, Card, Layout } from 'antd';
import './Dashboard.css';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column } = Table;
const { Sider, Content } = Layout;

const Dashboard = () => {
    // State for selected date range and employee
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');

    // Sample data for the Timeline Summary table
const timelineData = [
    { project: 'Project A', '0-20': 5, '21-40': 10, '41-60': 15, '61-80': 20, '81-100': 25 },
    { project: 'Project B', '0-20': 8, '21-40': 12, '41-60': 18, '61-80': 22, '81-100': 28 },
    // Add more data as needed
];


    // Sample data for departments and tasks
    const departments = ['Sales', 'Marketing', 'Engineering', 'HR'];
    const tasksData = [
        { department: 'Sales', pendingTasks: 10, completedTasks: 20 },
        { department: 'Marketing', pendingTasks: 15, completedTasks: 25 },
        { department: 'Engineering', pendingTasks: 8, completedTasks: 18 },
        { department: 'HR', pendingTasks: 5, completedTasks: 15 },
    ];

    // Calculate number of days between the selected date range
    const calculateTotalDays = () => {
        if (selectedDateRange.length === 2) {
            const [start, end] = selectedDateRange;
            const totalDays = Math.abs(end.diff(start, 'days')) + 1;
            return totalDays;
        }
        return 0;
    };

    // Calculate number of working days (for example, excluding weekends)
    const calculateWorkingDays = () => {
        // Implementation for calculating working days can vary based on requirements
        // This is just a placeholder function
        return 0; // Placeholder value
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width={300} style={{ background: '#f0f2f5', padding: '20px' }}>
                <Card title="Filters" style={{ marginBottom: '20px' }} className='fade-in'>
                    <div>
                        <label className="dashboard-label">Date Range:</label>
                        <RangePicker
                            className="dashboard-datepicker"
                            value={selectedDateRange}
                            onChange={(dates) => setSelectedDateRange(dates)}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label className="dashboard-label">Employee:</label>
                        <Select
                            className="dashboard-select"
                            placeholder="Select employee"
                            value={selectedEmployee}
                            onChange={(value) => setSelectedEmployee(value)}
                        >
                            {/* Employee options */}
                            <Option value="employee1">Employee 1</Option>
                            <Option value="employee2">Employee 2</Option>
                            <Option value="employee3">Employee 3</Option>
                        </Select>
                    </div>
                </Card>
                <Card className='fade-in'>
                    <div className="dashboard-tag-container">
                        <Tag color="blue">Total Days: {calculateTotalDays()}</Tag>
                        <Tag color="green">Working Days: {calculateWorkingDays()}</Tag>
                    </div>
                </Card>
                <Card title="Attendance Summary" style={{ marginTop: '20px' }} className='fade-in'>
                    <div className="dashboard-tag-container2">
                            <Tag color="blue">Late In/Early Leave: 10</Tag>
                            <Tag color="magenta">Absent: 5</Tag>
                            <Tag color="red">Leave: 8</Tag>
                            <Tag color="gold">Kanban Request Count: 15</Tag>
                            <Tag color="purple">Kaizen Count: 20</Tag>
                    </div>
                </Card>
            </Sider>
            <Content style={{ overflow: 'auto' }}>
                <div className="dashboard-container">
                    {/* First Table: Department-wise Tasks */}
                    <Card className="dashboard-card fade-in" title="Department-wise Tasks" style={{ marginBottom: '2%' }} >
                        <Table dataSource={tasksData} pagination={false} className="dashboard-table">
                            <Column title="Department" dataIndex="department" key="department" />
                            <Column title="Pending Tasks" dataIndex="pendingTasks" key="pendingTasks" />
                            <Column title="Completed Tasks" dataIndex="completedTasks" key="completedTasks" />
                        </Table>
                    </Card>

                    {/* Second Table: Department-wise Pending Tasks Aging */}
                    <Card className="dashboard-card fade-in" title="Department-wise Pending Tasks Aging">
                        <Table dataSource={tasksData} pagination={false} className="dashboard-table">
                            <Column title="Department" dataIndex="department" key="department" />
                            <Column title="0-7 Days" dataIndex="0-7" key="0-7" />
                            <Column title="7-15 Days" dataIndex="7-15" key="7-15" />
                            <Column title="15-20 Days" dataIndex="15-20" key="15-20" />
                            <Column title="Above 20 Days" dataIndex="above20" key="above20" />
                        </Table>
                    </Card>


                    <Card className="dashboard-card fade-in" title="Timeline Summary">
                        <Table dataSource={timelineData} pagination={false} className="dashboard-table">
                            <Column title="Project" dataIndex="project" key="project" />
                            <Column title="0-20%" dataIndex="0-20" key="0-20" />
                            <Column title="21-40%" dataIndex="21-40" key="21-40" />
                            <Column title="41-60%" dataIndex="41-60" key="41-60" />
                            <Column title="61-80%" dataIndex="61-80" key="61-80" />
                            <Column title="81-100%" dataIndex="81-100" key="81-100" />
                        </Table>
                    </Card>
                </div>
            </Content>
        </Layout>
    );
};

export default Dashboard;
