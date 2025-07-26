interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    fromColor?: string;
    toColor?: string;
}
declare const GradientButton: (props: GradientButtonProps) => React.JSX.Element;
export default GradientButton;
