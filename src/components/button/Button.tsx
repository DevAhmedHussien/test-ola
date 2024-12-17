import React, { ReactNode } from 'react';

interface NavButtonProps {
  isActive: boolean;
  onClick: () => void;
  ariaLabel: string;
  icon: ReactNode; 
}

const NavButton: React.FC<NavButtonProps> = ({ isActive, onClick, ariaLabel, icon }) => {
  return (
    <button
      style={{ opacity: isActive ? 0.4 : 1 }}
      disabled={isActive}
      className="nav-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default NavButton;
