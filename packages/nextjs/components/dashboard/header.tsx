import Image from "next/image";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <div className="fixed top-[20.75px] left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[1440px] px-6">
        <header className="rounded-full bg-[#2E2F31]/90 backdrop-blur-sm px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo (3).svg" alt="StakeSmart Logo" width={32} height={32} />
              <div className="text-xl text-white font-bold">StakeSmart</div>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}
