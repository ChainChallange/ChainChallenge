// Custom Button Component
import React from 'react';

interface ButtonCustomProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ children, onClick, className }) => {
  return (
    <button className={`bg-primary p-4 font-medium rounded-xl ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonCustom;
