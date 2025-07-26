interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    color?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
declare const Button: (props: ButtonProps) => React.JSX.Element;
export default Button;
