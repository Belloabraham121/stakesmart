"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Protocol } from "@/types/api";
import { Chart, ChartConfiguration } from "chart.js/auto";
import { ChevronDown } from "lucide-react";
import { Button } from "~~/@/components/ui/button";

const timeRanges = ["1D", "1W", "1M", "3M"];
const colors = [
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#EF4444",
  "#14B8A6",
  "#6366F1",
  "#8B5CF6",
];

interface MultiProtocolChartProps {
  protocols: Protocol[];
}

export function MultiProtocolChart({ protocols }: MultiProtocolChartProps) {
  const [selectedRange, setSelectedRange] = useState("1M");
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    setLoading(true);
    if (protocols.length > 0 && selectedProtocols.length === 0) {
      setSelectedProtocols(protocols.slice(0, 5).map(p => p.id));
    }
    setLoading(false);
  }, [protocols, selectedProtocols.length]);

  useEffect(() => {
    if (chartRef.current && protocols.length > 0 && selectedProtocols.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const labels = ["1M ago", "3W ago", "2W ago", "1W ago", "Now"];
        const datasets = selectedProtocols
          .map((protocolId, index) => {
            const protocol = protocols.find(p => p.id === protocolId);
            if (!protocol) return null;

            const currentTvl = protocol.tvl;
            const historicalData = [
              currentTvl * 0.85,
              currentTvl * 0.9,
              currentTvl * 0.95,
              currentTvl * 0.98,
              currentTvl,
            ];

            return {
              label: protocol.name,
              data: historicalData,
              borderColor: colors[index % colors.length],
              backgroundColor: `${colors[index % colors.length]}33`,
              tension: 0.4,
              pointRadius: 0,
              fill: true,
            };
          })
          .filter(Boolean) as any[];

        const config: ChartConfiguration = {
          type: "line",
          data: {
            labels,
            datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "#9CA3AF",
                  usePointStyle: true,
                  pointStyle: "circle",
                },
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
        };

        chartInstanceRef.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [protocols, selectedProtocols]);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold text-white">Protocol Comparison</h3>
          <p className="text-sm text-gray-400">Compare TVL across different protocols</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto px-3 bg-slate-700 py-3">
                Protocols <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]  bg-slate-700">
              {protocols.map(protocol => (
                <DropdownMenuCheckboxItem
                  key={protocol.id}
                  checked={selectedProtocols.includes(protocol.id)}
                  onCheckedChange={checked => {
                    if (checked) {
                      setSelectedProtocols([...selectedProtocols, protocol.id]);
                    } else {
                      setSelectedProtocols(selectedProtocols.filter(id => id !== protocol.id));
                    }
                  }}
                >
                  {protocol.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          {loading ? <Skeleton className="h-full w-full" /> : <canvas ref={chartRef} />}
        </div>
      </CardContent>
    </Card>
  );
}
