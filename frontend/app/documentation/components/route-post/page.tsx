"use client";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function RoutePost() {
  type OpenState = {
    components: boolean;
    hooks: boolean;
    routes: boolean;
    [key: string]: boolean;
  };

  const [open, setOpen] = useState<OpenState>({
    components: false,
    hooks: false,
    routes: false,
  });

  const toggle = (section: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [section]: !prevOpen[section],
    }));
  };

  return (
    <main className="flex min-h-screen w-full gap-14 bg-[#121418] pt-44 px-72">
      <div className="flex flex-col w-1/6 h-screen text-[20px] gap-12">
        <Link href="/documentation/">
          <p className="text-[#9D9D9D]">API Reference</p>
        </Link>
        <div className="flex flex-col gap-4">
          <div>
            <div
              onClick={() => toggle("components")}
              className="cursor-pointer flex justify-between items-center text-white"
            >
              Components
              {open.components ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {open.components && (
              <div className="ml-5 mt-2 text-[#9D9D9D]">
                <Link href="/documentation/components/route-post">
                  <div>Route post</div>
                </Link>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div
              onClick={() => toggle("hooks")}
              className="cursor-pointer flex justify-between items-center text-white"
            >
              Hooks
              {open.hooks ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {open.hooks && (
              <div className="ml-5 mt-2 text-[#9D9D9D]">
                {/* Hooks content here */}
                <div>useHookExample</div>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div
              onClick={() => toggle("routes")}
              className="cursor-pointer flex justify-between items-center text-white"
            >
              Routes
              {open.routes ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {open.routes && (
              <div className="ml-5 mt-2 text-[#9D9D9D]">
                <Link href="/documentation/components/route-post/">
                  <div>routeExample</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-4/6">
        <div className="flex text-[20px] gap-4">
          <div className="text-[#9D9D9D]">References</div>
          <div className="text-[#9D9D9D]">&gt;</div>
          <div className="text-[#9D9D9D]">Components</div>
          <div className="text-[#9D9D9D]">&gt;</div>
          <div className="text-white">Route Postman</div>
        </div>
        <h1 className="text-3xl font-semibold">Route Postman</h1>
      </div>
      <div className="text-[20px]">
        <p>On This Page</p>
        <p className="text-[#9D9D9D]">Props</p>
        <p className="text-[#9D9D9D]">Notes</p>
      </div>
    </main>
  );
}
