"use client";

import { Bricolage_Grotesque } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import { ParallaxProvider } from "react-scroll-parallax";
import "~~/styles/globals.css";

const bricolage_Grotesque = Bricolage_Grotesque({ subsets: ["latin"] });

const StakeSmartApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${bricolage_Grotesque.className} bg-black`}>
        <ParallaxProvider>
          <div className="mx-auto ">{children}</div>
        </ParallaxProvider>
      </body>
    </html>
  );
};

export default StakeSmartApp;
