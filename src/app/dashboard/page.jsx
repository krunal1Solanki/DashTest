"use client"
import React, { useState } from "react";
import { List, Card } from "antd";
import DashHeader from "../../Components/Header";

const ITTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Update server configurations", list: "pending" },
    { id: 2, name: "Fix database connection issues", list: "pending" },
    { id: 3, name: "Implement new security protocols", list: "pending" },
    { id: 4, name: "Optimize website performance", list: "pending" },
    { id: 5, name: "Deploy latest software updates", list: "pending" }
  ]);

  const onDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, listName) => {
    const taskId = e.dataTransfer.getData("taskId");
    const targetTaskIndex = tasks.findIndex((task) => task.id.toString() === taskId);
    const targetTask = tasks[targetTaskIndex];
    if (targetTask.list === listName) return; // If dropping in the same list, no need to reorder
    const updatedTasks = tasks.map((task) =>
      task.id.toString() === taskId ? { ...task, list: listName } : task
    );
    setTasks(updatedTasks);
  };

  const lists = {
    pending: "Pending Tasks",
    hold: "Hold Tasks",
    done: "Done Tasks"
  };

  return (
    <div>
      <DashHeader />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: '20px' }}>
        {Object.keys(lists).map((listName) => (
          <div
            key={listName}
            style={{
              flex: 1,
              margin: "0 16px",
              background: "#f0f0f0", // Grayish background color
              padding: "16px",
              borderRadius: "8px"
            }}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, listName)}
          >
            <h3 style={{ color: "#333" }}>{lists[listName]}</h3>
            <List
              dataSource={tasks.filter((task) => task.list === listName)}
              renderItem={(task) => (
                <List.Item
                  draggable
                  onDragStart={(e) => onDragStart(e, task)}
                  style={{ marginBottom: "8px" }}
                >
                  <Card>{task.name}</Card>
                </List.Item>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ITTasks;
