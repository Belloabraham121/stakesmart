"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DevelopmentActivity } from "@/components/protocol/development-activity";
import { ProtocolChart } from "@/components/protocol/protocol-chart";
import { ProtocolInfo } from "@/components/protocol/protocol-info";
import { ProtocolStats } from "@/components/protocol/protocol-stats";
import { YieldsInfo } from "@/components/protocol/yields-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Protocol } from "@/types/api";
import { YieldsPoolData } from "@/types/yields-api";
import { DashboardHeader } from "~~/components/dashboard/header";

export default function ProtocolPage({ params }: { params: { id: string } }) {
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [poolData, setPoolData] = useState<YieldsPoolData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch protocol data
        const protocolRes = await fetch("https://api.llama.fi/protocols");
        const protocolData = await protocolRes.json();
        const protocolsArray = Object.values(protocolData) as Protocol[];
        const selectedProtocol = protocolsArray.find(p => p.id === params.id);

        // Fetch yields data
        const yieldsRes = await fetch("https://yields.llama.fi/pools");
        const yieldsData = await yieldsRes.json();
        const selectedPool = yieldsData.data.find(
          (p: YieldsPoolData) => p.project.toLowerCase() === selectedProtocol?.name.toLowerCase(),
        );

        setProtocol(selectedProtocol || null);
        setPoolData(selectedPool || null);
      } catch (error) {
        console.error("Failed to fetch protocol data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!protocol) {
    return <div>Protocol not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <DashboardHeader />
      <div className="container py-[90px] mb-[-70px] mx-auto px-4">
        <div className="flex items-center gap-4">
          <Image
            src={protocol.logo}
            alt={`${protocol.name} logo`}
            width={24}
            height={24}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{protocol.name}</h1>
            <p className="text-sm text-gray-400">{protocol.category}</p>
          </div>
        </div>
      </div>
      <main className="container mx-auto p-4 pt-8">
        <Tabs defaultValue="information" className="space-y-8">
          <TabsList className="bg-gray-800 text-white">
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="tvl">TVL</TabsTrigger>
            <TabsTrigger value="yields">Yields</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>

          <TabsContent value="information" className="space-y-8">
            <ProtocolInfo protocol={protocol} poolData={poolData} />
          </TabsContent>

          <TabsContent value="tvl" className="space-y-8">
            <ProtocolChart protocol={protocol} />
            <ProtocolStats protocol={protocol} poolData={poolData} />
          </TabsContent>

          <TabsContent value="yields" className="space-y-8">
            <YieldsInfo poolData={poolData} />
          </TabsContent>

          <TabsContent value="development">
            <DevelopmentActivity protocol={protocol} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
