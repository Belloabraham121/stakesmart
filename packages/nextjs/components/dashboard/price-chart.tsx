"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Protocol } from "@/types/api";
import { Chart } from "chart.js/auto";
import { ArrowUpRight } from "lucide-react";
import { Button } from "~~/@/components/ui/button";

const timeRanges = ["1D", "1W", "1M", "3M"];

interface PriceChartProps {
  selectedProtocol: Protocol | null;
}

export function PriceChart({ selectedProtocol }: PriceChartProps) {
  const [selectedRange, setSelectedRange] = useState("1M");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (selectedProtocol && typeof window !== "undefined") {
      const ctx = chartRef.current?.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const labels = ["1M ago", "3W ago", "2W ago", "1W ago", "Now"];
        const data = [
          selectedProtocol.tvl * 0.9,
          selectedProtocol.tvl * 0.95,
          selectedProtocol.tvl * 0.98,
          selectedProtocol.tvl * 0.99,
          selectedProtocol.tvl,
        ];

        chartInstanceRef.current = new Chart(ctx, {
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
                },
              },
              y: {
                display: true,
                grid: {
                  color: "#374151",
                },
                ticks: {
                  color: "#9CA3AF",
                  callback: value => `$${((value as number) / 1e9).toFixed(2)}B`,
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedProtocol]);

  if (!selectedProtocol) {
    return <div className="text-white">Select a protocol to view details</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4 ">
      <Card className="w-full lg:w-1/2 bg-gray-900 border-gray-80 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <div className="text-sm text-white">TVL</div>
            <div className="text-2xl font-bold text-gray-400">${(selectedProtocol.tvl / 1e9).toFixed(2)}B</div>
            <div className="text-sm text-emerald-500">{selectedProtocol.change_1d.toFixed(2)}% (24h)</div>
          </div>
          <div className="flex gap-2">
            {timeRanges.map(range => (
              <Button
                key={range}
                variant={selectedRange === range ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedRange(range)}
                className="text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <canvas ref={chartRef} />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-1/2 bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Details</h3>
          <Link href={`/protocol/${selectedProtocol.id}`}>
            <Button variant="outline" size="sm" className="bg-white">
              Full Details
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-white">Name</div>
              <div className="font-medium text-gray-400">{selectedProtocol.name}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-white">Symbol</div>
              <div className="font-medium text-gray-400">{selectedProtocol.symbol}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-white">Category</div>
              <div className="font-medium text-gray-400">{selectedProtocol.category}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-white">Chain</div>
              <div className="font-medium text-gray-400">{selectedProtocol.chain}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-white">1h Change</div>
              <div className={`font-medium ${selectedProtocol.change_1h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {selectedProtocol.change_1h.toFixed(2)}%
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-white">7d Change</div>
              <div className={`font-medium ${selectedProtocol.change_7d >= 0 ? "text-green-500" : "text-red-500"}`}>
                {selectedProtocol.change_7d.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-white">Description</div>
            <p className="text-sm text-gray-400">{selectedProtocol.description}</p>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-white">Website</div>
            <a
              href={selectedProtocol.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {selectedProtocol.url}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
