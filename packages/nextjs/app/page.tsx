"use client";

import type { NextPage } from "next";
import { ParallaxProvider } from "react-scroll-parallax";
import { EthereumBanner } from "~~/components/ethereum-banner";
import { Features } from "~~/components/features";
import { HeroSection } from "~~/components/hero-section";
import { HowItWorks } from "~~/components/how-it-works";
import { SiteFooter } from "~~/components/site-footer";
import { SiteHeader } from "~~/components/site-header";
import { SupportedProtocols } from "~~/components/supported-protocols";

const Home: NextPage = () => {
  return (
    <>
      <ParallaxProvider>
        <div className="min-h-screen bg-black text-white max">
          <SiteHeader />
          <main>
            <HeroSection />
            <EthereumBanner />
            <SupportedProtocols />
            <HowItWorks />
            <Features />
          </main>
          <SiteFooter />
        </div>
      </ParallaxProvider>
    </>
  );
};

export default Home;
