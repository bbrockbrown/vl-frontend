import Button from "./Button";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  fromColor?: string; 
  toColor?: string;   
}

const GradientButton = ({
  children,
  className = "",
  fromColor = "#3B82F6", 
  toColor = "#FACC15",   
  ...props
}: GradientButtonProps) => {
  return (
    <Button
      style={{
        ["--from-color" as any]: fromColor,
        ["--to-color" as any]: toColor,
      }}
      className={`relative overflow-hidden px-5 py-2 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r [background:linear-gradient(90deg,var(--from-color),var(--to-color))] hover:opacity-90 transition ease-in ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
