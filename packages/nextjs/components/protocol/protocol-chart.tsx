"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Protocol } from "@/types/api";
import { Chart, ChartConfiguration } from "chart.js/auto";

interface ProtocolChartProps {
  protocol: Protocol;
}

export function ProtocolChart({ protocol }: ProtocolChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const currentDate = new Date();
        const labels = Array.from({ length: 30 }, (_, i) => {
          const d = new Date(currentDate);
          d.setDate(d.getDate() - (29 - i));
          return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        });

        const data = Array.from({ length: 30 }, (_, i) => {
          const randomFactor = 0.9 + Math.random() * 0.2;
          return (protocol.tvl * randomFactor * (i + 71)) / 100;
        });

        const config: ChartConfiguration = {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "TVL",
                data,
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.4,
                pointRadius: 0,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: context => `TVL: $${(context.parsed.y / 1e9).toFixed(2)}B`,
                },
              },
            },
            scales: {
              x: {
                display: true,
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#9CA3AF",
                  maxTicksLimit: 6,
                },
              },
              y: {
                display: true,
                grid: {
                  color: "#374151",
                },
                ticks: {
                  color: "#9CA3AF",
                  callback: value => `$${((value as number) / 1e9).toFixed(1)}B`,
                },
              },
            },
          },
        };

        chartInstanceRef.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [protocol]);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="font-bold text-white">TVL Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}
