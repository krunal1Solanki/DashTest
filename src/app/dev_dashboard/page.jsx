"use client"

import React, { useState } from 'react';
import { Select, Table, DatePicker, Tag, Card, Layout, Switch, Row, Col } from 'antd';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column } = Table;
const { Sider, Content } = Layout;
import { registerables } from 'chart.js';
import { Chart } from 'chart.js/auto';
Chart.register(...registerables);

const Dashboard = () => {
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [showTaskChart, setShowTaskChart] = useState(false);
    const [showAgingChart, setShowAgingChart] = useState(false);
    const [showTimelineChart, setShowTimelineChart] = useState(false);

    const tasksData = [
        { department: 'Sales', pendingTasks: 10, completedTasks: 20 },
        { department: 'Marketing', pendingTasks: 15, completedTasks: 25 },
        { department: 'Engineering', pendingTasks: 8, completedTasks: 18 },
        { department: 'HR', pendingTasks: 5, completedTasks: 15 },
    ];

    const timelineData = [
        { project: 'Project A', '0-20': 5, '21-40': 10, '41-60': 15, '61-80': 20, '81-100': 25 },
        { project: 'Project B', '0-20': 8, '21-40': 12, '41-60': 18, '61-80': 22, '81-100': 28 },
        // Add more data as needed
    ];

    const calculateTotalDays = () => {
        if (selectedDateRange.length === 2) {
            const [start, end] = selectedDateRange;
            const totalDays = Math.abs(end.diff(start, 'days')) + 1;
            return totalDays;
        }
        return 0;
    };

    const barChartData = {
        labels: tasksData.map(data => data.department),
        datasets: [
            {
                label: 'Pending',
                backgroundColor: 'red',
                data: tasksData.map(data => data.pendingTasks)
            },
            {
                label: 'Completed',
                backgroundColor: 'green',
                data: tasksData.map(data => data.completedTasks)
            }
        ]
    };



    const calculateWorkingDays = () => {
        // Placeholder function
        return 0;
    };

   
    const agingTasksData = [
        { department: 'Sales', '0-7': 5, '7-15': 10, '15-20': 15, above20: 20 },
        { department: 'Marketing', '0-7': 8, '7-15': 12, '15-20': 18, above20: 24 },
        { department: 'Engineering', '0-7': 3, '7-15': 6, '15-20': 9, above20: 12 },
        { department: 'HR', '0-7': 2, '7-15': 3, '15-20': 5, above20: 7 },
    ];

    const generateAgingChartData = () => {
        return {
            labels: agingTasksData.map(data => data.department),
            datasets: [
                {
                    label: '0-7 Days',
                    backgroundColor: 'red',
                    data: agingTasksData.map(data => data['0-7'])
                },
                {
                    label: '7-15 Days',
                    backgroundColor: 'green',
                    data: agingTasksData.map(data => data['7-15'])
                },
                {
                    label: '15-20 Days',
                    backgroundColor: 'blue',
                    data: agingTasksData.map(data => data['15-20'])
                },
                {
                    label: 'Above 20 Days',
                    backgroundColor: 'yellow',
                    data: agingTasksData.map(data => data['above20'])
                }
            ]
        };
    };

    
    // Generate data for Timeline Summary chart
    const generateTimelineChartData = () => {
        // Modify this logic to generate data dynamically based on your requirements
        return {
            labels: ['Project A', 'Project B'], // Sample projects, replace with actual project names
            datasets: [
                {
                    label: '0-20%',
                    backgroundColor: 'red',
                    data: [5, 8] // Sample data, replace with actual data
                },
                {
                    label: '21-40%',
                    backgroundColor: 'green',
                    data: [10, 12] // Sample data, replace with actual data
                },
                {
                    label: '41-60%',
                    backgroundColor: 'blue',
                    data: [15, 18] // Sample data, replace with actual data
                },
                {
                    label: '61-80%',
                    backgroundColor: 'yellow',
                    data: [20, 22] // Sample data, replace with actual data
                },
                {
                    label: '81-100%',
                    backgroundColor: 'purple',
                    data: [25, 28] // Sample data, replace with actual data
                }
            ]
        };
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
                    <Card className="dashboard-card fade-in" title="Department-wise Tasks">
                        <Row justify="end" style={{ marginBottom: '10px' }}>
                            <Col>
                                <Switch checkedChildren="Chart" unCheckedChildren="Table" onChange={(checked) => setShowTaskChart(checked)} />
                            </Col>
                        </Row>
                        {showTaskChart ? (
                            <Bar data={barChartData} />
                        ) : (
                            <Table dataSource={tasksData} pagination={false} className="dashboard-table">
                                <Column title="Department" dataIndex="department" key="department" />
                                <Column title="Pending Tasks" dataIndex="pendingTasks" key="pendingTasks" />
                                <Column title="Completed Tasks" dataIndex="completedTasks" key="completedTasks" />
                            </Table>
                        )}
                    </Card>

                    <Card className="dashboard-card fade-in" title="Department-wise Pending Tasks Aging">
                        <Row justify="end" style={{ marginBottom: '10px' }}>
                            <Col>
                                <Switch checkedChildren="Chart" unCheckedChildren="Table" onChange={(checked) => setShowAgingChart(checked)} />
                            </Col>
                        </Row>
                        {showAgingChart ? (
                            <Bar data={generateAgingChartData()} />
                        ) : (
                            <Table dataSource={agingTasksData} pagination={false} className="dashboard-table">
                                <Column title="Department" dataIndex="department" key="department" />
                                <Column title="0-7 Days" dataIndex="0-7" key="0-7" />
                                <Column title="7-15 Days" dataIndex="7-15" key="7-15" />
                                <Column title="15-20 Days" dataIndex="15-20" key="15-20" />
                                <Column title="Above 20 Days" dataIndex="above20" key="above20" />
                            </Table>
                        )}
                    </Card>


                    <Card className="dashboard-card fade-in" title="Timeline Summary">
                        <Row justify="end" style={{ marginBottom: '10px' }}>
                            <Col>
                                <Switch checkedChildren="Chart" unCheckedChildren="Table" onChange={(checked) => setShowTimelineChart(checked)} />
                            </Col>
                        </Row>
                        {showTimelineChart ? (
                            <Bar data={generateTimelineChartData()} />
                        ) : (
                            <Table dataSource={timelineData} pagination={false} className="dashboard-table">
                                <Column title="Project" dataIndex="project" key="project" />
                                <Column title="0-20%" dataIndex="0-20" key="0-20" />
                                <Column title="21-40%" dataIndex="21-40" key="21-40" />
                                <Column title="41-60%" dataIndex="41-60" key="41-60" />
                                <Column title="61-80%" dataIndex="61-80" key="61-80" />
                                <Column title="81-100%" dataIndex="81-100" key="81-100" />
                            </Table>
                        )}
                    </Card>
                </div>
            </Content>
        </Layout>
    );
};

export default Dashboard;
