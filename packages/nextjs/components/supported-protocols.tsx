"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Protocol } from "@/types/api";
import { motion } from "framer-motion";

const protocols = [
  { name: "Aave", logo: "/aave-logo.svg" },
  { name: "Lido", logo: "/lido-logo.svg" },
  { name: "EtherFi", logo: "/etherfi-logo.svg" },
  { name: "Rocket Pool", logo: "/rocketpool-logo.svg" },
  { name: "Stakewise", logo: "/stakewise-logo.svg" },
  { name: "Stader", logo: "/stader-logo.svg" },
  { name: "Frax", logo: "/frax-logo.svg" },
  { name: "Swell", logo: "/swell-logo.svg" },
  { name: "Ankr", logo: "/ankr-logo.svg" },
  { name: "Kiln", logo: "/kiln-logo.svg" },
];

export function SupportedProtocols() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Supported Protocols</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {protocols.map((protocol, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={protocol.logo}
                alt={`${protocol.name} logo`}
                width={80}
                height={80}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
