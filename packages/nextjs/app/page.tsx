"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main>
          {/* <HeroSection />
        <SupportedProtocols />
        <FeatureCards /> */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
