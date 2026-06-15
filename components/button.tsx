interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  color: "green" | "red" | "blue" | "white" | "gray" | "custom";
  onClick: () => void;
}

export default function Button({
  className,
  children,
  color,
  onClick,
}: ButtonProps) {
  const buttonColors = {
    green: "bg-green-900",
    red: "bg-red-800",
    blue: "text-blue-600 border-blue-600 bg-white",
    white: "text-white border-white",
    gray: "bg-gray-500",
    custom: "",
  };

  return (
    <button
      className={`flex items-center justify-center gap-3 cursor-pointer px-2 py-1 rounded-xl border hover:-translate-y-0.5 duration-100 ${buttonColors[color]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
