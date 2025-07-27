interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    fromColor?: string;
    toColor?: string;
}
declare const GradientButton: ({ children, className, fromColor, toColor, ...props }: GradientButtonProps) => import("react/jsx-runtime").JSX.Element;
export default GradientButton;
