"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { Network } from "../../app/network";

export default function Navbar() {
  return (
    <div className="fixed top-4 left-0 w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <Image src={Logo} alt="logo" height={60

          } />
        </Link>
        <div className="flex items-center gap-5 font-medium ml-40">
          <Link href="/" className="transition hover:text-white hover:cursor-pointer text-zinc-600">
            Community 
          </Link>
          <Link href="/" className="transition hover:text-white hover:cursor-pointer text-zinc-600">
            Developers Docs
          </Link>
        </div>
        <div className="my-auto ml-auto">
          <Network />
        </div>
      </div>
    </div>
  );
}
