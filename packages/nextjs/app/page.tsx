import type { NextPage } from "next";
import { EthereumBanner } from "~~/components/ethereum-banner";
import { FeatureCards } from "~~/components/feature-card";
import { HeroSection } from "~~/components/hero-section";
import { SiteFooter } from "~~/components/site-footer";
import { SiteHeader } from "~~/components/site-header";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="min-h-screen bg-black text-white max">
        <SiteHeader />
        <main>
          <HeroSection />
          <EthereumBanner />
          <FeatureCards />
          {/* <SupportedProtocols />
        <FeatureCards />  */}
        </main>
        <SiteFooter />
      </div>
    </>
  );
};

export default Home;
