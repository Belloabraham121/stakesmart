"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

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
    <header className="fixed top-[20.75px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-188px)] rounded-full bg-slate-900/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo (3).svg" alt="Quest Logo" width={32} height={32} />
          <span className="text-xl font-bold">StakeSmart.</span>
        </Link>
        <div className="h-11 px-4 py-2.5 bg-gradient-to-r from-[#72d9e1] via-[#72f5d1] to-[#76e67c] rounded-[90px] shadow border border-white justify-center items-center gap-1 inline-flex">
          <div className="w-5 h-5 " />
          <div className="px-1 justify-center items-center flex">
            <div className="text-white text-base font-semibold font-['Inter Display'] leading-normal">Launch App</div>
          </div>
          <div className="w-5 h-5 relative" />
        </div>
      </div>
    </header>
  );
};
