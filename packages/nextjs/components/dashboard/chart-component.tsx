"use client";

import { useEffect, useRef } from "react";
import {
  CategoryScale,
  Chart,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController);

const ChartComponent = () => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Nov 12", "Nov 19", "Nov 26", "Dec 03", "Dec 10"],
          datasets: [
            {
              label: "Price",
              data: [82, 90, 107, 132, 174.53],
              borderColor: "#818cf8",
              backgroundColor: "rgba(129, 140, 248, 0.1)",
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#9CA3AF",
              },
            },
            y: {
              display: true,
              grid: {
                color: "#374151",
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#9CA3AF",
                callback: value => `$${value}`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas id="myChart" />;
};

export default ChartComponent;
