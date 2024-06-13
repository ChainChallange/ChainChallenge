//Custom Button Component
import React from 'react';
export default function ButtonCustom({
  children,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  onClick: () => void;
}>) {
  return (
    <button className="bg-primary p-4 font-medium rounded-xl" onClick={onClick}>
      {children}
    </button>
  );
}
