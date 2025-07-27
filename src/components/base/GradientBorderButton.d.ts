import React from 'react';
interface GradientBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    fromColor?: string;
    toColor?: string;
}
declare const GradientBorderButton: ({ children, className, fromColor, toColor, ...props }: GradientBorderButtonProps) => import("react/jsx-runtime").JSX.Element;
export default GradientBorderButton;
