import { useRef } from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  fromColor?: string; // hex or any CSS color
  toColor?: string;   // hex or any CSS color
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  className = "",
  fromColor = "#3B82F6", // Tailwind blue-500
  toColor = "#FACC15",   // Tailwind yellow-300
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = buttonRef.current;
    if (!button) return;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.className = "ripple";

    // Remove any old ripple
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <button
      ref={buttonRef}
      style={{
        ["--from-color" as any]: fromColor,
        ["--to-color" as any]: toColor,
      }}
      className={`relative overflow-hidden px-5 py-2 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r [background-image:linear-gradient(to_right,var(--from-color),var(--to-color))] hover:opacity-90 ${className}`}
      onClick={e => {
        createRipple(e);
        if (props.onClick) props.onClick(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default GradientButton;
