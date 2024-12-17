"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Protocol } from "@/types/api";
import { MultiProtocolChart } from "~~/components/dashboard/multi-protocol-chart";
import { PriceChart } from "~~/components/dashboard/price-chart";
import { ProtocolList } from "~~/components/dashboard/protocol-list";

export default function DashboardPage() {
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [protocols, setProtocols] = useState<Protocol[]>([]);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await fetch("https://api.llama.fi/protocols");
        const data = await response.json();
        const protocolsArray = Object.values(data) as Protocol[];
        const liquidStakingProtocols = protocolsArray
          .filter(p => p.category === "Liquid Staking")
          .sort((a, b) => b.tvl - a.tvl)
          .slice(0, 10);
        setProtocols(liquidStakingProtocols);
      } catch (err) {
        console.error("Failed to fetch protocols:", err);
      }
    };

    fetchProtocols();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <DashboardHeader />
      <main className="container mx-auto p-4 pt-24">
        <div className="mb-8">
          <h1 className="text-sm uppercase tracking-wider text-gray-400">Dashboard Overview</h1>
        </div>
        <div className="mb-8">
          <MultiProtocolChart protocols={protocols} />
        </div>
        <PriceChart selectedProtocol={selectedProtocol} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,300px]"></div>
        <ProtocolList onSelectProtocol={setSelectedProtocol} />
      </main>
    </div>
  );
}
