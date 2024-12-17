"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Parallax } from "react-scroll-parallax";
import { Button } from "~~/@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16">
      <Parallax translateY={[-20, 20]}>
        <div
          className="absolute inset-1 z-0 mt-6"
          style={{
            backgroundImage: "url(/grid-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 text-center  max-w-[1024px]">
          <div className="inline-flex items-center rounded-full border border-emerald-700/50 bg-emerald-700/10 px-3 py-1 text-sm text-emerald-400">
            <Zap className="mr-2 h-4 w-4" />
            Spark of innovation. Sheeeesh!
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Compare, Stake, Maximize
            <br />
            your Wealth
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Empowering DeFi Investors with a Unified Platform to Compare, Optimize, and Maximize Staking Opportunities
            While Ensuring Transparency, Ease of Access, and Trust.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#72d9e1] via-[#72f5d1] to-[#76e67c] hover:bg-emerald-600 h-11 px-4 py-2.5 rounded-[90px]"
            >
              <Zap className="mr-2 h-4 w-4" />
              Launch App
            </Button>
          </Link>
        </div>
      </Parallax>
      <div className="absolute bottom-0 right-0">
        <Image src="/open-vault.png" alt="Security Cloud" width={300} height={200} className="opacity-80" />
      </div>
      <div className="absolute bottom-0 left-0">
        <Image
          src="/holographic-shape.png"
          alt="Decorative holographic shape"
          width={250}
          height={250}
          className="opacity-90"
        />
      </div>
    </section>
  );
}
