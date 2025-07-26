import React from 'react';
import Button from './Button';

interface GradientBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  fromColor?: string;
  toColor?: string;
}

const GradientBorderButton = ({
  children,
  className = "",
  fromColor = "#4F8CFF",
  toColor = "#FFD580",
  ...props
}: GradientBorderButtonProps) => {
  const gradientStyle = `linear-gradient(90deg, ${fromColor} 0%, ${toColor} 100%)`;

  return (
    <Button
      className={`relative cursor-pointer bg-[var(--background)] rounded-xl px-6 py-3 font-semibold overflow-hidden hover:opacity-100 ${className}`}
      style={{
        border: '2px solid transparent',
        background: `linear-gradient(var(--background), var(--background)) padding-box, ${gradientStyle} border-box`,
        borderRadius: '12px',
      }}
      {...props}
    >
      {/* Gradient text */}
      <span 
        className="relative"
        style={{
          background: gradientStyle,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {children}
      </span>
    </Button>
  );
};

export default GradientBorderButton; 