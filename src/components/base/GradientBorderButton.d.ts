interface GradientBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    fromColor?: string;
    toColor?: string;
}
declare const GradientBorderButton: (props: GradientBorderButtonProps) => React.JSX.Element;
export default GradientBorderButton;
