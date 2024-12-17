"use client";

import { motion } from "framer-motion";
import { BarChart, Search, Wallet } from "lucide-react";
import { Parallax } from "react-scroll-parallax";

const steps = [
  {
    icon: Search,
    title: "Compare Protocols",
    description: "Explore and compare various staking protocols.",
  },
  {
    icon: BarChart,
    title: "Analyze ROI",
    description: "Review potential returns and fee structures.",
  },
  {
    icon: Wallet,
    title: "Stake with Confidence",
    description: "Choose the best protocol and start staking.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {steps.map((step, index) => (
            <Parallax key={index} translateY={[10, -10]} className="w-full md:w-1/3 mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
