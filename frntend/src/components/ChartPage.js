/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartPage = () => {
  const [taskData, setTaskData] = useState({
    topPriority: 0,
    averagePriority: 0,
    lowPriority: 0
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/task/getTask") // Ensure backend is running
      .then((response) => {
        const tasks = response.data;
        
        // Count tasks by priority level
        const priorityCounts = {
          topPriority: tasks.filter(task => task.priority === "Top").length,
          averagePriority: tasks.filter(task => task.priority === "Average").length,
          lowPriority: tasks.filter(task => task.priority === "Low").length
        };

        setTaskData(priorityCounts);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }, []);

  // Chart Data
  const data = {
    labels: ["Top Priority", "Average Priority", "Low Priority"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [taskData.topPriority, taskData.averagePriority, taskData.lowPriority],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "60%", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Task Priority Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default ChartPage;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartPage = () => {
  const [taskData, setTaskData] = useState({
    topPriority: 0,
    averagePriority: 0,
    lowPriority: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/task/getTask") // Ensure backend is running
      .then((response) => {
        const tasks = response.data;

        // Count tasks by priority level
        const priorityCounts = {
          topPriority: tasks.filter((task) => task.task.priority === "top").length,
          averagePriority: tasks.filter((task) => task.task.priority === "average").length,
          lowPriority: tasks.filter((task) => task.task.priority === "low").length,
        };

        setTaskData(priorityCounts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
        setError("Failed to fetch task data. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Chart Data
  const data = {
    labels: ["Top Priority", "Average Priority", "Low Priority"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [taskData.topPriority, taskData.averagePriority, taskData.lowPriority],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"], // Custom colors
        borderWidth: 1,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensure Y-axis shows whole numbers (1, 2, 3, etc.)
        },
        title: {
          display: true,
          text: "Number of Tasks",
        },
      },
      x: {
        title: {
          display: true,
          text: "Priority Level",
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Task Priority Chart</h2>
      {loading ? (
        <p>Loading chart data...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={{ height: "400px" }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default ChartPage;