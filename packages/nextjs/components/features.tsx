"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, Zap } from "lucide-react";
import { Parallax } from "react-scroll-parallax";

const features = [
  {
    icon: BarChart3,
    title: "Real-time ROI Comparison",
    description: "Compare returns across multiple protocols instantly.",
  },
  {
    icon: PieChart,
    title: "Fee Structure Analysis",
    description: "Understand and compare fee structures easily.",
  },
  {
    icon: Zap,
    title: "Simplified Staking",
    description: "Stake with ease, regardless of your experience level.",
  },
  {
    icon: TrendingUp,
    title: "Maximized Returns",
    description: "Make informed decisions to optimize your earnings.",
  },
];

export function Features() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {features.map((feature, index) => (
            <Parallax key={index} translateY={[10, -10]} className="flex">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-zinc-800 bg-zinc-900">
                  <CardHeader>
                    <feature.icon className="w-10 h-10 text-teal-500 mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
