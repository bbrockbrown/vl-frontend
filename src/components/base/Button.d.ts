interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    color?: string;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
