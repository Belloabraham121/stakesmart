"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Protocol } from "@/types/api";

interface ProtocolListProps {
  onSelectProtocol: (protocol: Protocol) => void;
}

export function ProtocolList({ onSelectProtocol }: ProtocolListProps) {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);

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
        setError("Failed to fetch protocols");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProtocols();
  }, []);

  const formatTVL = (tvl: number) => {
    if (tvl >= 1_000_000_000) {
      return `$${(tvl / 1_000_000_000).toFixed(3)}b`;
    } else if (tvl >= 1_000_000) {
      return `$${(tvl / 1_000_000).toFixed(3)}m`;
    }
    return `$${tvl.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-white font-semibold">Liquid Staking Protocols</h2>
        </div>
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-gray-800">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-right text-gray-400">Chain</TableHead>
                <TableHead className="text-right text-gray-400">TVL</TableHead>
                <TableHead className="text-right text-gray-400">1h Change</TableHead>
                <TableHead className="text-right text-gray-400">1d Change</TableHead>
                <TableHead className="text-right text-gray-400">7d Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gray-700 rounded-full" />
                      <div className="h-4 w-32 bg-gray-700 rounded" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 w-20 bg-gray-700 rounded" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 w-20 bg-gray-700 rounded" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 w-20 bg-gray-700 rounded" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 w-20 bg-gray-700 rounded" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 w-20 bg-gray-700 rounded" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-white font-semibold">Liquid Staking Protocols</h2>
      </div>
      <div className="rounded-md border bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-right text-gray-400">Chain</TableHead>
              <TableHead className="text-right text-gray-400">TVL</TableHead>
              <TableHead className="text-right text-gray-400">1h Change</TableHead>
              <TableHead className="text-right text-gray-400">1d Change</TableHead>
              <TableHead className="text-right text-gray-400">7d Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protocols.map(protocol => (
              <TableRow
                key={protocol.id}
                className={`hover:bg-gray-900/50 border-gray-800 cursor-pointer ${selectedProtocol === protocol.id ? "bg-gray-800" : ""}`}
                onClick={() => {
                  setSelectedProtocol(protocol.id);
                  onSelectProtocol(protocol);
                }}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full  bg-gray-800">
                      <Image src={protocol.logo} alt={protocol.name} width={24} height={24} className="rounded-full" />
                    </div>
                    <span className="text-white">{protocol.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-white">{protocol.chain}</TableCell>
                <TableCell className="text-right text-white">{formatTVL(protocol.tvl)}</TableCell>
                <TableCell className={`text-right ${protocol.change_1h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {protocol.change_1h.toFixed(2)}%
                </TableCell>
                <TableCell className={`text-right ${protocol.change_1d >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {protocol.change_1d.toFixed(2)}%
                </TableCell>
                <TableCell className={`text-right ${protocol.change_7d >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {protocol.change_7d.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
