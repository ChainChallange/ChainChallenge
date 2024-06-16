'use client'
import TableDocument from '@/components/tableDocument/tableDocument';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

export default function Documentation() {


  return (
    <main className="flex min-h-screen w-full gap-14 bg-[#121418] pt-44 px-72">
      <TableDocument  />
    </main>
  );
}
