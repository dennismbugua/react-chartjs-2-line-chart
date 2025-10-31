import React, { useState, useMemo } from "react";
import "./styles.css";
import { Line } from "react-chartjs-2";

// Data for different time ranges
const timeRangeData = {
  "1M": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    revenue: [45, 52, 48, 58],
    expenses: [38, 42, 40, 45],
    stats: {
      totalRevenue: "$203k",
      totalExpenses: "$165k",
      netProfit: "$38k",
      growthRate: "18.5%",
      revenueChange: "+15.2%",
      expenseChange: "+9.8%",
      profitChange: "+28.3%",
      growthChange: "+3.1%"
    }
  },
  "3M": {
    labels: ["Month 1", "Month 2", "Month 3"],
    revenue: [155, 178, 195],
    expenses: [142, 158, 170],
    stats: {
      totalRevenue: "$528k",
      totalExpenses: "$470k",
      netProfit: "$58k",
      growthRate: "16.8%",
      revenueChange: "+14.3%",
      expenseChange: "+10.5%",
      profitChange: "+25.7%",
      growthChange: "+2.8%"
    }
  },
  "6M": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    revenue: [65, 78, 92, 85, 88, 98],
    expenses: [58, 65, 72, 75, 78, 82],
    stats: {
      totalRevenue: "$506k",
      totalExpenses: "$430k",
      netProfit: "$76k",
      growthRate: "15.3%",
      revenueChange: "+12.5%",
      expenseChange: "+8.2%",
      profitChange: "+23.1%",
      growthChange: "+2.4%"
    }
  },
  "1Y": {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    revenue: [245, 268, 295, 312],
    expenses: [215, 230, 248, 265],
    stats: {
      totalRevenue: "$1.12M",
      totalExpenses: "$958k",
      netProfit: "$162k",
      growthRate: "17.2%",
      revenueChange: "+16.8%",
      expenseChange: "+11.3%",
      profitChange: "+31.5%",
      growthChange: "+4.2%"
    }
  },
  "ALL": {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    revenue: [580, 785, 1020, 1285, 1450],
    expenses: [520, 685, 865, 1095, 1220],
    stats: {
      totalRevenue: "$5.12M",
      totalExpenses: "$4.39M",
      netProfit: "$730k",
      growthRate: "19.5%",
      revenueChange: "+22.4%",
      expenseChange: "+15.8%",
      profitChange: "+45.2%",
      growthChange: "+5.8%"
    }
  }
};

const getChartOptions = (timeRange) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 750,
    easing: "easeInOutQuart"
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 13,
          weight: "500"
        }
      }
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: "600"
      },
      bodyFont: {
        size: 13
      },
      callbacks: {
        label: function(context) {
          return context.dataset.label + ": $" + context.parsed.y + "k";
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12
        }
      }
    },
    y: {
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
        drawBorder: false
      },
      ticks: {
        font: {
          size: 12
        },
        callback: function(value) {
          return "$" + value + "k";
        }
      }
    }
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false
  }
});

const StatCard = ({ title, value, change, isPositive, icon }) => (
  <div className="stat-card">
    <div className="stat-header">
      <div className="stat-icon">{icon}</div>
      <span className="stat-title">{title}</span>
    </div>
    <div className="stat-value">{value}</div>
    <div className={`stat-change ${isPositive ? "positive" : "negative"}`}>
      <span className="arrow">{isPositive ? "↑" : "↓"}</span>
      {change}
    </div>
  </div>
);

export default function App() {
  const [timeRange, setTimeRange] = useState("6M");

  // Memoize chart data based on selected time range
  const chartData = useMemo(() => {
    const rangeData = timeRangeData[timeRange];
    return {
      labels: rangeData.labels,
      datasets: [
        {
          label: "Revenue",
          data: rangeData.revenue,
          fill: true,
          backgroundColor: "rgba(249, 115, 22, 0.1)",
          borderColor: "rgba(249, 115, 22, 1)",
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: "rgba(249, 115, 22, 1)",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: "rgba(249, 115, 22, 1)",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 3
        },
        {
          label: "Expenses",
          data: rangeData.expenses,
          fill: true,
          backgroundColor: "rgba(234, 88, 12, 0.1)",
          borderColor: "rgba(234, 88, 12, 1)",
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: "rgba(234, 88, 12, 1)",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: "rgba(234, 88, 12, 1)",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 3
        }
      ]
    };
  }, [timeRange]);

  // Get current stats based on time range
  const currentStats = timeRangeData[timeRange].stats;

  return (
    <div className="App">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Financial Overview</h1>
            <p className="dashboard-subtitle">Track your business performance metrics</p>
          </div>
          <div className="time-range-selector">
            {["1M", "3M", "6M", "1Y", "ALL"].map((range) => (
              <button
                key={range}
                className={`time-button ${timeRange === range ? "active" : ""}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard
            title="Total Revenue"
            value={currentStats.totalRevenue}
            change={`${currentStats.revenueChange} from last period`}
            isPositive={true}
            icon="💰"
          />
          <StatCard
            title="Total Expenses"
            value={currentStats.totalExpenses}
            change={`${currentStats.expenseChange} from last period`}
            isPositive={true}
            icon="📊"
          />
          <StatCard
            title="Net Profit"
            value={currentStats.netProfit}
            change={`${currentStats.profitChange} from last period`}
            isPositive={true}
            icon="📈"
          />
          <StatCard
            title="Growth Rate"
            value={currentStats.growthRate}
            change={`${currentStats.growthChange} from last period`}
            isPositive={true}
            icon="🚀"
          />
        </div>

        {/* Chart Section */}
        <div className="chart-container">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Performance Trends</h2>
              <p className="chart-subtitle">Revenue vs Expenses over time ({timeRange})</p>
            </div>
            <button className="export-button">
              <span className="export-icon">⬇</span>
              Export Data
            </button>
          </div>
          <div className="chart-wrapper">
            <Line data={chartData} options={getChartOptions(timeRange)} />
          </div>
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
}
