"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
import { Button } from "~~/@/components/ui/button";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  // No menu links available
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const burgerMenuRef = useRef<HTMLDivElement>(null);
  // useOutsideClick(
  //   burgerMenuRef,
  //   useCallback(() => setIsDrawerOpen(false), []),
  // );

  return (
    <div className="fixed top-[20.75px] left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[1440px] px-6">
        <header className="rounded-full bg-[#2E2F31]/90 backdrop-blur-sm px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo (3).svg" alt="StakeSmart Logo" width={32} height={32} />
              <span className="text-xl font-bold">StakeSmart</span>
            </Link>
            <Button className="bg-gradient-to-r from-[#72d9e1] via-[#72f5d1] to-[#76e67c] hover:bg-emerald-600 h-11 px-4 py-2.5 rounded-[90px]">
              <Zap className="mr-2 h-4 w-4" />
              Launch App
              <Image src="/Vector.svg" alt="launch-arrow" width={6} height={10} className="ml-2" />
            </Button>
          </div>
        </header>
      </div>
    </div>
  );
};

{
  /* <header className="fixed top-[20.75px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-188px)] rounded-full bg-slate-900/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo (3).svg" alt="Quest Logo" width={32} height={32} />
          <span className="text-xl font-bold">StakeSmart.</span>
        </Link>
        <Button className="bg-emerald-700 hover:bg-emerald-600 h-11 px-4 py-2.5 rounded-[90px]">
          <Zap className="mr-2 h-4 w-4" />
          Launch App
          <Image src="/Vector.svg" alt="launch-arrow" width={6} height={10} className="ml-2" />
        </Button>
      </div>
    </header> */
}
