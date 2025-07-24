interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    fromColor?: string;
    toColor?: string;
}
declare const GradientButton: React.FC<GradientButtonProps>;
export default GradientButton;
