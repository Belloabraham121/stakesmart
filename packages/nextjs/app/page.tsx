"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { HeroSection } from "~~/components/HeroSection";
import { EthereumBanner } from "~~/components/ethereum-banner";
import { FeatureCards } from "~~/components/feature-card";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="min-h-screen bg-black text-white max">
        <Header />
        <main>
          <HeroSection />
          <EthereumBanner />
          <FeatureCards />
          {/* <SupportedProtocols />
        <FeatureCards />  */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
