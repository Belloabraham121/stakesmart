import { Bricolage_Grotesque } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({ title: "StakeSmart", description: "Built with 🏗 Scaffold-ETH 2" });

const bricolage_Grotesque = Bricolage_Grotesque({ subsets: ["latin"] });

const StakeSmartApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${bricolage_Grotesque.className} bg-black`}>
        <div className="mx-auto max-w-[1440px]">{children}</div>
      </body>
    </html>
  );
};

export default StakeSmartApp;
