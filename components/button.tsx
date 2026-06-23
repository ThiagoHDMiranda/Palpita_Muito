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
    green: "bg-green-900 shadow-xs hover:shadow-md shadow-white/30 ",
    red: "bg-red-800 shadow-xs hover:shadow-md shadow-white/30",
    blue: "text-blue-600 border-blue-600 bg-white",
    white:
      "text-gray-300 border-gray-300 shadow-xs hover:shadow-md shadow-white/30",
    gray: "bg-gray-500 shadow-xs hover:shadow-md shadow-white/30",
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
