'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

export default function Documentation() {
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
      <div className='flex flex-col w-1/6 h-screen text-[20px] gap-24'>
        <p className="text-[#9D9D9D]">API Reference</p>
        <div className="flex flex-col gap-4">
          <div>
            <div onClick={() => toggle('components')} className="cursor-pointer flex justify-between items-center text-white">
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
          <div className="">
            <div onClick={() => toggle('routes')} className="cursor-pointer flex justify-between items-center text-white">
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
          <div className="">References</div>
        </div>
        <h1 className="text-3xl font-semibold mt-20">References</h1>
      </div>
      <div className="text-[20px]">
        <p>On This Page</p>
        <p>Props</p>
        <p>Notes</p>
      </div>
    </main>
  );
}