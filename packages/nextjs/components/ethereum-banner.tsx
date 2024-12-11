import Image from "next/image";

export function EthereumBanner() {
  return (
    <div className="w-full max-w-[1440px] mx-auto py-20 overflow-hidden">
      <div className="relative flex items-center justify-center">
        <h2
          className="text-[450px] font-bold tracking-tighter text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)",
            textStroke: "1px rgba(255, 255, 255, 0.1)",
          }}
        >
          ETHEREUM
        </h2>
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2">
          <Image src="/ethereum-logo.png" alt="Ethereum Logo" width={120} height={120} className="opacity-90" />
        </div>
      </div>
    </div>
  );
}
